import type { Plugin } from "@opencode-ai/plugin";
import { readFile } from "node:fs/promises";
import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const CORE_HOOKS = [
  "计划确认 Hook",
  "阶段门禁触发 Hook",
  "知识消费顺序 Hook",
  "骨架修改留痕 Hook",
  "Strict 模式识别 Hook",
];

const HOOK_GUIDE = [
  "【MES Hook 提示】当前骨架已启用治理护栏。",
  "第一批核心 Hook：计划确认、阶段门禁、知识消费顺序、骨架修改留痕、Strict 模式识别。",
  "如需继续正式执行，请先满足对应门禁与留痕要求。",
].join("\n");

function shouldInjectForCommand(command: string) {
  return /^\/(mes-(analyze|design|develop|test|deliver|refresh|emergency|init|verify))/i.test(command.trim());
}

function classifyCommand(command: string) {
  const value = command.trim();
  if (/\/mes-(init-converge|verify-phase-gate|verify-state-migration)$/i.test(value)) return "strict-gate";
  if (/\/mes-(deliver-release|deliver-handover|test-verify)$/i.test(value)) return "exit";
  if (/\/mes-(refresh-knowledge|refresh-update-api-registry|refresh-update-code-map|refresh-update-dependency|refresh-validate-quality)$/i.test(value))
    return "refresh";
  if (/\/mes-emergency-fix$/i.test(value)) return "emergency";
  if (/\/mes-(design-detail|develop-code)$/i.test(value)) return "must-pass";
  if (/\/mes-(analyze-requirement|design-detail|develop-code|test-verify|deliver-release)$/i.test(value)) return "multi-repo";
  if (/\/mes-(design-detail|develop-code|analyze-requirement)$/i.test(value)) return "plan-required";
  return "general";
}

function shouldWarnForTool(tool: string) {
  return ["grep", "glob", "read", "edit"].includes(tool);
}

function isGovernancePath(path: string) {
  const normalized = path.replace(/\\/g, "/");
  return [
    "/AGENTS.md",
    "/.opencode/references/mes-ai-reference/rules/governance/",
    "/.opencode/references/mes-ai-reference/reference/phase-gates/",
    "/.opencode/references/mes-ai-reference/reference/knowledge-consumption/",
    "/mes-ai-dev/workspace/refresh/",
  ].some((segment) => normalized.endsWith(segment) || normalized.includes(segment));
}

function isSharedKnowledgePath(path: string) {
  const normalized = path.replace(/\\/g, "/");
  return [
    "/mes-ai-dev/knowledge/state/state.yaml",
    "/mes-ai-dev/knowledge/state/summary.md",
    "/mes-ai-dev/knowledge/state/baseline.md",
    "/mes-ai-dev/knowledge/dependency-graph/",
    "/mes-ai-dev/knowledge/reference/",
    "/mes-ai-dev/knowledge/rules/",
    "/mes-ai-dev/knowledge/code-map/",
  ].some((segment) => normalized.endsWith(segment) || normalized.includes(segment));
}

function isMigrationPath(path: string) {
  const normalized = path.replace(/\\/g, "/").toLowerCase();
  return normalized.includes("state.yaml") || normalized.includes("dbscript/") || normalized.includes("migration") || normalized.includes("rollback");
}

function isDraftArtifactPath(path: string) {
  const normalized = path.replace(/\\/g, "/");
  return normalized.includes("/working/") || normalized.includes("/evidence/");
}

function isKnowledgeRefreshTarget(path: string) {
  const normalized = path.replace(/\\/g, "/");
  return normalized.includes("/mes-ai-dev/knowledge/") || normalized.includes("/api-registry") || normalized.includes("/dependency-graph") || normalized.includes("/code-map");
}

function isNamingSensitivePath(path: string) {
  const normalized = path.replace(/\\/g, "/");
  return normalized.includes("/.opencode/skills/") || normalized.includes("/.opencode/commands/") || normalized.includes("/.opencode/agents/");
}

function isDocOptimizationTarget(path: string) {
  const normalized = path.replace(/\\/g, "/").toLowerCase();
  return (
    normalized.endsWith("/index.md") &&
    (normalized.includes("/.opencode/references/mes-ai-reference/reference/") ||
      normalized.includes("/.opencode/references/mes-ai-reference/rules/") ||
      normalized.includes("/.opencode/references/mes-ai-reference/templates/"))
  );
}

async function safeRead(path: string) {
  try {
    return await readFile(path, "utf8");
  } catch {
    return null;
  }
}

async function writeTrace(rootDir: string, line: string) {
  try {
    const safeRoot = rootDir || process.cwd();
    const traceDir = join(safeRoot, "mes-ai-dev", "workspace", "refresh");
    const tracePath = join(traceDir, "hook-runtime-trace.log");
    await mkdir(traceDir, { recursive: true });
    await appendFile(tracePath, `${line}\n`, "utf8");
  } catch {
    // tracing must never break runtime hooks
  }
}

export const MesHookGuardPlugin: Plugin = async ({ client, directory, worktree }) => {
  const commandCache = new Map<string, string>();
  const categoryCache = new Map<string, string>();
  const noticeCache = new Set<string>();
  const rootDir = worktree || directory;
  const readPaths = [
    join(rootDir, "AGENTS.md"),
    join(rootDir, ".opencode", "references", "mes-ai-reference", "rules", "governance", "hook-usage-standard.md"),
    join(rootDir, ".opencode", "references", "mes-ai-reference", "reference", "phase-gates", "index.md"),
    join(rootDir, ".opencode", "references", "mes-ai-reference", "reference", "knowledge-consumption", "index.md"),
    join(rootDir, "mes-ai-dev", "workspace", "refresh", "hook-rollout-plan.md"),
  ];

  return {
    async event(input) {
      if (input.event.type === "session.deleted") {
        for (const key of [...noticeCache]) {
          if (key.startsWith(`${input.event.properties.info.id}:`)) noticeCache.delete(key);
        }
        commandCache.delete(input.event.properties.info.id);
        categoryCache.delete(input.event.properties.info.id);
      }
    },

    "command.execute.before": async (input, output) => {
      if (!shouldInjectForCommand(input.command)) return;

      commandCache.set(input.sessionID, input.command);
      const category = classifyCommand(input.command);
      categoryCache.set(input.sessionID, category);
      const messageByCategory: Record<string, string> = {
        "strict-gate": "命中高风险门禁命令：请先确认计划、门禁与证据路径。",
        exit: "命中阶段退出命令：请先检查阶段产物、审查报告与交接文档。",
        refresh: "命中知识刷新命令：请先确认刷新范围、同步对象与留痕。",
        emergency: "命中紧急修复命令：请优先遵循最小应急路径与严格留痕。",
        "must-pass": "命中专项 must-pass 场景：请优先检查表真实性、Java 可解析性、MyBatis 或 Provider 一致性。",
        "multi-repo": "命中多仓协同场景：请优先确认后端、前端、数据库或多个仓的责任边界。",
        "plan-required": "命中正式执行命令：请先确认计划、步骤、预期产出与风险。",
        general: "已启用第一批核心治理护栏。",
      };

      if (/\/mes-develop-code$/i.test(input.command.trim())) {
        messageByCategory.general = "命中开发命令：建议先确认测试计划或最小失败用例，再进入实现。";
      }

      await client.tui.showToast({
        body: {
          title: "MES Hook",
          message: messageByCategory[category] ?? messageByCategory.general,
          variant: "info",
        },
      });

      await writeTrace(rootDir, `[command.before] session=${input.sessionID} category=${category} command=${input.command}`);

      if (category === "strict-gate" || category === "exit") {
        output.parts.push({
          type: "text",
          text: [
            "【MES Hook Guard】当前命中高风险命令。",
            category === "strict-gate"
              ? "继续前必须显式确认 Strict、门禁与证据链。"
              : "继续前必须显式确认阶段产物、详细审查报告与主交接文档。",
          ].join("\n"),
        });

        const guardOutput = output as { noReply?: boolean; cancelled?: boolean };
        guardOutput.noReply = true;
      }

      if (category === "must-pass") {
        output.parts.push({
          type: "text",
          text: "【MES Hook Guard】当前命中专项 must-pass 场景。继续前必须显式补齐真实性/一致性检查。",
        });

        const guardOutput = output as { noReply?: boolean; cancelled?: boolean };
        guardOutput.noReply = true;
      }
    },

    "tool.execute.before": async (input, output) => {
      if (!shouldWarnForTool(input.tool)) return;

      const cachedCommand = commandCache.get(input.sessionID);
      const cachedCategory = categoryCache.get(input.sessionID);
      await writeTrace(
        rootDir,
        `[tool.before] session=${input.sessionID} tool=${input.tool} category=${cachedCategory ?? "none"} command=${cachedCommand ?? "none"}`,
      );

      if (input.tool === "read") {
        const filePath = (output.args as { filePath?: string } | undefined)?.filePath;
        if (typeof filePath === "string" && isGovernancePath(filePath)) {
          const key = `${input.sessionID}:governance-read:${filePath}`;
          if (!noticeCache.has(key)) {
            noticeCache.add(key);
            await client.tui.showToast({
              body: {
                title: "MES Hook",
                message: "命中骨架治理/知识入口：请先按索引与门禁读取",
                variant: "info",
              },
            });
          }
        }

        if (typeof filePath === "string" && isSharedKnowledgePath(filePath)) {
          const key = `${input.sessionID}:shared-knowledge:${filePath}`;
          if (!noticeCache.has(key)) {
            noticeCache.add(key);
            await client.tui.showToast({
              body: {
                title: "MES Hook",
                message: "命中共享知识文件：请避免并行直写，优先局部结果后主控收口。",
                variant: "warning",
              },
            });
          }
        }

        if (typeof filePath === "string" && isMigrationPath(filePath)) {
          const key = `${input.sessionID}:migration:${filePath}`;
          if (!noticeCache.has(key)) {
            noticeCache.add(key);
            await client.tui.showToast({
              body: {
                title: "MES Hook",
                message: "命中状态/数据库迁移路径：请优先走 Strict，并准备迁移与回滚证据。",
                variant: "warning",
              },
            });
          }
        }

        if (typeof filePath === "string" && isDraftArtifactPath(filePath)) {
          const key = `${input.sessionID}:draft-artifact:${filePath}`;
          if (!noticeCache.has(key)) {
            noticeCache.add(key);
            await client.tui.showToast({
              body: {
                title: "MES Hook",
                message: "命中过程产物路径：working/evidence 不能直接替代正式阶段结论。",
                variant: "warning",
              },
            });
          }
        }

        if (typeof filePath === "string" && isKnowledgeRefreshTarget(filePath)) {
          const key = `${input.sessionID}:knowledge-refresh:${filePath}`;
          if (!noticeCache.has(key)) {
            noticeCache.add(key);
            await client.tui.showToast({
              body: {
                title: "MES Hook",
                message: "命中知识资产路径：请确认是否需要同步 refresh code-map / dependency-graph / api-registry。",
                variant: "info",
              },
            });
          }
        }

        if (typeof filePath === "string" && isNamingSensitivePath(filePath)) {
          const key = `${input.sessionID}:naming:${filePath}`;
          if (!noticeCache.has(key)) {
            noticeCache.add(key);
            await client.tui.showToast({
              body: {
                title: "MES Hook",
                message: "命中命名敏感路径：请确认新增项遵守 mes- 前缀与命名规范。",
                variant: "info",
              },
            });
          }
        }

        if (typeof filePath === "string" && isDocOptimizationTarget(filePath)) {
          const key = `${input.sessionID}:doc-optimization:${filePath}`;
          if (!noticeCache.has(key)) {
            noticeCache.add(key);
            await client.tui.showToast({
              body: {
                title: "MES Hook",
                message: "命中文档优化目标：请确认是否需要补 summary、metadata、related files 或互链。",
                variant: "info",
              },
            });
          }
        }
      }

      if (input.tool === "glob" || input.tool === "grep") {
        const key = `${input.sessionID}:${input.tool}:${cachedCategory ?? "general"}`;
        if (!noticeCache.has(key)) {
          noticeCache.add(key);
          await client.tui.showToast({
            body: {
              title: "MES Hook",
              message: cachedCommand
                ? `${input.tool} 调用受治理护栏监控：${cachedCommand}${cachedCategory ? `（${cachedCategory}）` : ""}`
                : `${input.tool} 调用受治理护栏监控`,
              variant: "warning",
            },
          });
        }
      }
    },

    "experimental.chat.system.transform": async (input, output) => {
      if (!commandCache.has(input.sessionID ?? "")) return;

      const cachedCategory = categoryCache.get(input.sessionID ?? "") ?? "general";

      const [agents, hookStandard, phaseGate, knowledge, rollout] = await Promise.all(
        readPaths.map((path) => safeRead(path)),
      );

      const categoryHintByType: Record<string, string> = {
        "strict-gate": "【MES Hook】当前命中高风险门禁场景，必须优先检查 Strict、门禁与证据链。",
        exit: "【MES Hook】当前命中阶段退出场景，必须优先检查 stage-output-report、详细审查报告与主交接文档。",
        refresh: "【MES Hook】当前命中知识刷新场景，必须优先确认刷新范围、同步对象与共享知识边界。",
        emergency: "【MES Hook】当前命中紧急修复场景，必须优先遵循最小应急路径与留痕。",
        "must-pass": "【MES Hook】当前命中专项 must-pass 场景，必须优先准备真实性/一致性检查。",
        "multi-repo": "【MES Hook】当前命中多仓协同场景，必须优先确认跨仓边界、依赖与交接。",
        "plan-required": "【MES Hook】当前命中正式执行场景，必须优先确认计划、步骤、预期产出与风险。",
        general: "【MES Hook】当前命中通用治理场景，优先遵守计划先行、知识消费顺序与门禁。",
      };

      const systemHints = [
        HOOK_GUIDE,
        `已启用：${CORE_HOOKS.join(" / ")}`,
        categoryHintByType[cachedCategory] ?? categoryHintByType.general,
        agents ? "【MES Hook】AGENTS.md 存在，需优先遵守计划先行、门禁与留痕。" : null,
        hookStandard ? "【MES Hook】Hook 使用标准已加载，优先使用第一批核心 Hook。" : null,
        phaseGate ? "【MES Hook】阶段门禁索引存在，进入/消费/退出前请先校验门禁。" : null,
        knowledge ? "【MES Hook】知识消费索引存在，优先按总览→索引→详情→源码顺序消费。" : null,
        rollout ? "【MES Hook】实施计划已存在，运行时需保持低噪音提示。" : null,
      ].filter((item): item is string => Boolean(item));

      output.system.unshift(systemHints.join("\n\n"));
      await writeTrace(rootDir, `[system.transform] session=${input.sessionID ?? "none"} category=${cachedCategory}`);
    },

    "tool.execute.after": async (input, output) => {
      if (input.tool !== "bash") return;

      const cachedCategory = categoryCache.get(input.sessionID);
      if (!cachedCategory) return;

      const suffixByCategory: Record<string, string> = {
        "strict-gate": "strict-gate",
        exit: "phase-exit",
        refresh: "refresh",
        emergency: "emergency",
        "must-pass": "must-pass",
        "multi-repo": "multi-repo",
        "plan-required": "plan-required",
        general: "guarded",
      };

      output.title = `${output.title} [${suffixByCategory[cachedCategory] ?? "guarded"}]`;
      output.metadata = {
        ...output.metadata,
        mesHookEnabled: true,
        mesHookCategory: cachedCategory,
      };

      await writeTrace(rootDir, `[tool.after] session=${input.sessionID} tool=bash category=${cachedCategory} title=${output.title}`);
    },
  };
};

export default MesHookGuardPlugin;
