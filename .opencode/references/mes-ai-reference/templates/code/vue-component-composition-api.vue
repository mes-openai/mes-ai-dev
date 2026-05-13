<template>
  <div class="xxx-component">
    <!-- 搜索区域 -->
    <div class="xxx-component__search">
      <common-input
        v-model="searchForm.columnName"
        placeholder="请输入字段名"
        @enter="handleSearch"
      />
      <common-button type="primary" @click="handleSearch">
        查询
      </common-button>
    </div>

    <!-- 数据表格 -->
    <common-table
      :data="tableData"
      :columns="tableColumns"
      :loading="loading"
      :pagination="pagination"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * XXX组件
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
import { ref, reactive, onMounted } from 'vue';
import type { PropType } from 'vue';
import CommonInput from '@/common/components/Input';
import CommonButton from '@/common/components/Button';
import CommonTable from '@/common/components/Table';
import { getXxxPage } from '@/api/xxx';
import type { XxxVO, XxxQueryDTO } from '@/types/xxx';

const props = defineProps({
  moduleId: {
    type: [Number, String] as PropType<number | string>,
    default: null
  },
  showAction: {
    type: Boolean as PropType<boolean>,
    default: true
  }
});

const emit = defineEmits<{
  (e: 'create'): void;
  (e: 'update', data: XxxVO): void;
  (e: 'delete', id: number): void;
}>();

const searchForm = reactive<XxxQueryDTO>({
  columnName: ''
});

const tableData = ref<XxxVO[]>([]);
const tableColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'columnName', label: '字段名' },
  { prop: 'createdTime', label: '创建时间', width: 180 }
];

const loading = ref(false);

const pagination = reactive({
  pageNum: 1,
  pageSize: 20,
  total: 0
});

const loadData = async () => {
  loading.value = true;
  try {
    const params = {
      ...searchForm,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    };
    const res = await getXxxPage(params);
    if (res.code === 200) {
      tableData.value = res.data.list || [];
      pagination.total = res.data.total || 0;
    }
  } catch (error) {
    console.error('加载数据失败', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  pagination.pageNum = 1;
  loadData();
};

const handlePageChange = (page: { pageNum: number; pageSize: number }) => {
  pagination.pageNum = page.pageNum;
  pagination.pageSize = page.pageSize;
  loadData();
};

const handleCreate = () => {
  emit('create');
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.xxx-component {
  padding: 20px;
}

.xxx-component__search {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>
