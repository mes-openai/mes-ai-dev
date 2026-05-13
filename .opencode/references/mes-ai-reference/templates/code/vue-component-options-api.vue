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
      <common-button @click="handleReset">
        重置
      </common-button>
    </div>

    <!-- 操作区域 -->
    <div class="xxx-component__action">
      <common-button type="primary" @click="handleCreate">
        新增
      </common-button>
      <common-button
        type="danger"
        :disabled="!selectedRows.length"
        @click="handleBatchDelete"
      >
        批量删除
      </common-button>
    </div>

    <!-- 数据表格 -->
    <common-table
      :data="tableData"
      :columns="tableColumns"
      :loading="loading"
      :pagination="pagination"
      @selection-change="handleSelectionChange"
      @page-change="handlePageChange"
      @row-click="handleRowClick"
    />

    <!-- 详情对话框 -->
    <common-dialog
      :visible.sync="detailVisible"
      title="XXX详情"
      width="600px"
      @close="handleDetailClose"
    >
      <xxx-detail :data="detailData" />
    </common-dialog>
  </div>
</template>

<script>
/**
 * XXX组件
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
import CommonInput from '@/common/components/Input';
import CommonButton from '@/common/components/Button';
import CommonTable from '@/common/components/Table';
import CommonDialog from '@/common/components/Dialog';
import XxxDetail from './XxxDetail.vue';
import { getXxxPage, deleteXxx, batchDeleteXxx } from '@/api/xxx';

export default {
  name: 'XxxComponent',

  components: {
    CommonInput,
    CommonButton,
    CommonTable,
    CommonDialog,
    XxxDetail
  },

  props: {
    moduleId: {
      type: [Number, String],
      default: null
    },
    showAction: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      searchForm: {
        columnName: ''
      },
      tableData: [],
      tableColumns: [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'columnName', label: '字段名' },
        { prop: 'createdTime', label: '创建时间', width: 180 }
      ],
      loading: false,
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      selectedRows: [],
      detailVisible: false,
      detailData: null
    };
  },

  computed: {
    hasSelected() {
      return this.selectedRows.length > 0;
    }
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      this.loading = true;
      try {
        const params = {
          ...this.searchForm,
          pageNum: this.pagination.pageNum,
          pageSize: this.pagination.pageSize
        };
        const res = await getXxxPage(params);
        if (res.code === 200) {
          this.tableData = res.data.list || [];
          this.pagination.total = res.data.total || 0;
        }
      } catch (error) {
        this.$message.error('加载数据失败');
      } finally {
        this.loading = false;
      }
    },

    handleSearch() {
      this.pagination.pageNum = 1;
      this.loadData();
    },

    handleReset() {
      this.searchForm = { columnName: '' };
      this.pagination.pageNum = 1;
      this.loadData();
    },

    handleCreate() {
      this.$emit('create');
    },

    async handleBatchDelete() {
      if (!this.hasSelected) {
        this.$message.warning('请选择要删除的记录');
        return;
      }

      try {
        await this.$confirm('确定要删除选中的记录吗？', '提示', {
          type: 'warning'
        });

        const ids = this.selectedRows.map(row => row.id);
        await batchDeleteXxx(ids);
        this.$message.success('删除成功');
        this.loadData();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败');
        }
      }
    },

    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },

    handlePageChange(page) {
      this.pagination.pageNum = page.pageNum;
      this.pagination.pageSize = page.pageSize;
      this.loadData();
    },

    handleRowClick(row) {
      this.detailData = row;
      this.detailVisible = true;
    },

    handleDetailClose() {
      this.detailVisible = false;
      this.detailData = null;
    }
  }
};
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

.xxx-component__action {
  margin-bottom: 20px;
}
</style>
