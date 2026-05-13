<template>
  <div class="xxx-page">
    <!-- 页面标题区域 -->
    <div class="xxx-page__header">
      <h2 class="xxx-page__title">XXX管理</h2>
    </div>

    <!-- 页面内容区域 -->
    <div class="xxx-page__content">
      <xxx-component
        ref="xxxComponentRef"
        :module-id="moduleId"
        @create="handleCreate"
        @update="handleUpdate"
        @delete="handleDelete"
      />
    </div>

    <!-- 新增/编辑对话框 -->
    <common-dialog
      :visible="formVisible"
      :title="formTitle"
      width="800px"
      @close="handleFormClose"
    >
      <xxx-form
        ref="xxxFormRef"
        :data="formData"
        :mode="formMode"
        @submit="handleFormSubmit"
        @cancel="handleFormCancel"
      />
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
/**
 * XXX页面
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import CommonDialog from '@/common/components/Dialog';
import XxxComponent from '@/components/XxxComponent.vue';
import XxxForm from '@/components/XxxForm.vue';
import { createXxx, updateXxx, deleteXxx } from '@/api/xxx';
import type { XxxVO, XxxDTO } from '@/types/xxx';
import { ElMessage, ElMessageBox } from 'element-plus';

const route = useRoute();
const router = useRouter();

const moduleId = computed(() => route.params.moduleId as string | null);

const xxxComponentRef = ref();
const xxxFormRef = ref();

const formVisible = ref(false);
const formTitle = ref('');
const formMode = ref<'create' | 'update'>('create');
const formData = ref<XxxDTO | null>(null);

onMounted(() => {
  initPage();
});

const initPage = () => {
  // 加载初始化数据
};

const handleCreate = () => {
  formTitle.value = '新增XXX';
  formMode.value = 'create';
  formData.value = null;
  formVisible.value = true;
};

const handleUpdate = (row: XxxVO) => {
  formTitle.value = '编辑XXX';
  formMode.value = 'update';
  formData.value = { ...row } as XxxDTO;
  formVisible.value = true;
};

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定要删除该记录吗？', '提示', {
      type: 'warning'
    });

    await deleteXxx(id);
    ElMessage.success('删除成功');
    xxxComponentRef.value?.loadData();
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败');
    }
  }
};

const handleFormSubmit = async (data: XxxDTO) => {
  try {
    if (formMode.value === 'create') {
      await createXxx(data);
      ElMessage.success('新增成功');
    } else {
      await updateXxx(data);
      ElMessage.success('编辑成功');
    }

    formVisible.value = false;
    xxxComponentRef.value?.loadData();
  } catch (error) {
    ElMessage.error(formMode.value === 'create' ? '新增失败' : '编辑失败');
  }
};

const handleFormCancel = () => {
  formVisible.value = false;
};

const handleFormClose = () => {
  xxxFormRef.value?.resetForm();
  formData.value = null;
};

onBeforeRouteLeave(() => {
  // 离开页面前的处理
});
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
