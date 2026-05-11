<template>
  <div class="xxx-page">
    <!-- 页面标题区域 -->
    <div class="xxx-page__header">
      <h2 class="xxx-page__title">XXX管理</h2>
      <div class="xxx-page__breadcrumb">
        <common-breadcrumb :items="breadcrumbItems" />
      </div>
    </div>

    <!-- 页面内容区域 -->
    <div class="xxx-page__content">
      <!-- 主要组件 -->
      <xxx-component
        ref="xxxComponent"
        :module-id="moduleId"
        @create="handleCreate"
        @update="handleUpdate"
        @delete="handleDelete"
      />
    </div>

    <!-- 新增/编辑对话框 -->
    <common-dialog
      :visible.sync="formVisible"
      :title="formTitle"
      width="800px"
      @close="handleFormClose"
    >
      <xxx-form
        ref="xxxForm"
        :data="formData"
        :mode="formMode"
        @submit="handleFormSubmit"
        @cancel="handleFormCancel"
      />
    </common-dialog>
  </div>
</template>

<script>
/**
 * XXX页面
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
import CommonBreadcrumb from '@/common/components/Breadcrumb';
import CommonDialog from '@/common/components/Dialog';
import XxxComponent from '@/components/XxxComponent.vue';
import XxxForm from '@/components/XxxForm.vue';
import { createXxx, updateXxx, deleteXxx } from '@/api/xxx';

export default {
  name: 'XxxPage',

  components: {
    CommonBreadcrumb,
    CommonDialog,
    XxxComponent,
    XxxForm
  },

  data() {
    return {
      /** 面包屑项 */
      breadcrumbItems: [
        { label: '首页', path: '/home' },
        { label: 'XXX管理', path: '/xxx' }
      ],
      /** 模块ID */
      moduleId: null,
      /** 表单对话框可见性 */
      formVisible: false,
      /** 表单标题 */
      formTitle: '',
      /** 表单模式 */
      formMode: 'create',
      /** 表单数据 */
      formData: {}
    };
  },

  computed: {
    /** 获取模块ID（从路由参数） */
    routeModuleId() {
      return this.$route.params.moduleId;
    }
  },

  created() {
    this.initPage();
  },

  methods: {
    /** 初始化页面 */
    initPage() {
      if (this.routeModuleId) {
        this.moduleId = this.routeModuleId;
      }
      this.loadInitData();
    },

    /** 加载初始化数据 */
    async loadInitData() {
      // 根据需要加载下拉选项、字典数据等
    },

    /** 新增 */
    handleCreate() {
      this.formTitle = '新增XXX';
      this.formMode = 'create';
      this.formData = {};
      this.formVisible = true;
    },

    /** 编辑 */
    handleUpdate(row) {
      this.formTitle = '编辑XXX';
      this.formMode = 'update';
      this.formData = { ...row };
      this.formVisible = true;
    },

    /** 删除 */
    async handleDelete(id) {
      try {
        await this.$confirm('确定要删除该记录吗？', '提示', {
          type: 'warning'
        });

        await deleteXxx(id);
        this.$message.success('删除成功');
        this.$refs.xxxComponent.loadData();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败');
        }
      }
    },

    /** 表单提交 */
    async handleFormSubmit(data) {
      try {
        if (this.formMode === 'create') {
          await createXxx(data);
          this.$message.success('新增成功');
        } else {
          await updateXxx(data);
          this.$message.success('编辑成功');
        }

        this.formVisible = false;
        this.$refs.xxxComponent.loadData();
      } catch (error) {
        this.$message.error(this.formMode === 'create' ? '新增失败' : '编辑失败');
      }
    },

    /** 表单取消 */
    handleFormCancel() {
      this.formVisible = false;
    },

    /** 表单对话框关闭 */
    handleFormClose() {
      this.$refs.xxxForm?.resetForm();
      this.formData = {};
    }
  },

  /** 路由守卫（如需要） */
  beforeRouteEnter(to, from, next) {
    next();
  },

  beforeRouteLeave(to, from, next) {
    next();
  }
};
</script>

<style scoped>
.xxx-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.xxx-page__header {
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.xxx-page__title {
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: bold;
}

.xxx-page__content {
  flex: 1;
  overflow: auto;
  background: #fff;
}
</style>
