<template>
  <div class="vote-theme-page">
    <div class="operation-top">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="$router.push('/dict/edit/default')">新增字典</el-button>
    </div>
    <c-table ref="table" :handler="getData" @handlerlist="handlerList">
      <el-table
        :data="dataList"
        style="width: 100%"
        border
      >
        <el-table-column
          label="序号"
          type="index"
          width="60"
        />
        <el-table-column prop="name" label="参数名"/>
<!--        <el-table-column prop="value" label="参数值"/>/-->
        <el-table-column prop="typeName" label="类型"/>
<!--        <el-table-column prop="type" label="类型值"/>-->
        <el-table-column label="操作" width="380">
          <template slot-scope="{row}"  v-if="row.type === 1">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="$router.push('/dict/edit/' + row.id)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleClickDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </c-table>
  </div>
</template>
<script>
import {dictDelete,dictList}from '@/api/dict'
export default {
  name: "Dict",
  components:{
    CTable: ()=> import('@/components/custom/table/tablePagination')
  },
  data() {
    return {
      dataList: [],
      baseUrl: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    // 投票活动详情
    handleClickTo(id){
      this.$router.push('/dict/'+id)
    },
    // 删除
    async handleClickDelete(id){
      this._globalLoading('正在进行删除操作')
      const result = await  dictDelete(id)
      this.$message.success(result.msg||'删除成功')
      this.$refs.table.getData()
    },
    // 获取数据
    handlerList(value){
      this.dataList = value
    },
    getData(){
      return dictList
    }
  }
}
</script>
<style scoped>

</style>
