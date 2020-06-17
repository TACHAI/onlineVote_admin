<template>
  <div class="rank-page">
    <el-page-header content="排行榜" style="padding: 10px 20px 20px;" @back="$router.go(-1)" />
    <c-table
      ref="table"
      :handler="getData"
      :custom-data="[$route.params.paperId]"
      @handlerlist="handlerList"
    >
      <el-table :data="dataList" style="width: 100%" border>
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="试卷名" prop="paperName" />
        <el-table-column label="昵称" prop="pickname" />
        <el-table-column label="头像" align="center">
          <template slot-scope="{row}">
            <img :src="row.headimgurl" width="100px" alt="头像">
          </template>
        </el-table-column>
        <el-table-column label="分数" prop="mark" />
      </el-table>
    </c-table>
  </div>
</template>

<script>
import { rank } from '@/api/rank'
import CTable from '@/components/custom/table/tablePagination'
export default {
  components: {
    CTable
  },
  data() {
    return {
      dataList: []
    }
  },
  methods: {
    getData() {
      return rank
    },
    handlerList(value) {
      this.dataList = value
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
