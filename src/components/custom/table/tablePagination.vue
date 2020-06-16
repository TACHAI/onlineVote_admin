<template>
  <div class="c_table">
    <slot />
    <el-pagination
      :current-page="pageNumber"
      :page-sizes="[20, 50, 100, 200, 400]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="padding-top: 20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    handler: {
      type: Function,
      default() {
        return function() {}
      }
    },
    customData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNumber: 1
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    reset() {
      this.pageNumber = 1
      this.getData()
    },
    // 修改分页
    handleCurrentChange(pageNumber) {
      this.pageNumber = pageNumber
      this.getData()
    },
    // 修改条目
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getData()
    },
    // 获取数据
    async getData() {
      const result = await this.handler()(this.pageSize, this.pageNumber, ...this.customData)
      if (result.total !== 0 && result.rows.length === 0 && this.pageNumber !== 1) {
        this.pageNumber--
        this.getData()
      }
      this.total = result.total
      this.$emit('handlerlist', result.rows)
    }
  }
}
</script>

<style lang="scss" scoped>
  .c_table {
    padding: 20px 0;
  }
  .c_text_overflow {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
