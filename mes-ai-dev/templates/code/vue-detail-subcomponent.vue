<template>
  <div class="xxx-detail">
    <div class="xxx-detail__item">
      <label>ID：</label>
      <span>{{ data?.id }}</span>
    </div>
    <div class="xxx-detail__item">
      <label>字段名：</label>
      <span>{{ data?.columnName }}</span>
    </div>
    <div class="xxx-detail__item">
      <label>创建时间：</label>
      <span>{{ data?.createdTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XxxDetail',
  props: {
    data: {
      type: Object,
      default: null
    }
  }
};
</script>

<style scoped>
.xxx-detail__item {
  margin-bottom: 15px;
  display: flex;
}

.xxx-detail__item label {
  width: 100px;
  font-weight: bold;
}
</style>
