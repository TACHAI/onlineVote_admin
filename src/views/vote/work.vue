<template>
  <div class="vote-exhibition-page">
    <el-page-header content="作品列表" style="padding: 10px 20px;" @back="$router.go(-1)" />
    <div class="operation-top">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="$router.push('/vote/'+$route.params.voteId+'/default')">新增作品</el-button>
    </div>
    <c-table :custom-data="[$route.params.voteId]" :handler="getData" @handlerlist="handlerList">
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
        <el-table-column label="作品名称" prop="name" />
        <el-table-column prop="auther" label="作者" />
        <el-table-column label="作品封面" align="center" width="180">
          <template slot-scope="{row}">
            <el-image
              v-if="row.cover"
              :src="baseUrl + row.cover"
              fit="contain"
            />
            <span v-else>暂无活动封面</span>
          </template>
        </el-table-column>
        <el-table-column label="投稿时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.createTime | datetimeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="票数">
          <template slot-scope="{row}">
            <span>{{ row.pv ? row.pv : 0 }}票</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="{row}">
            <el-button type="success" size="mini" icon="el-icon-view" @click="handleClickView(row)">预览</el-button>
            <el-button type="success" size="mini" icon="el-icon-edit" @click="handleClickTo(row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </c-table>
  </div>
</template>

<script>
import { voteWorkList } from '@/api/voteWork'
export default {
  name: 'VoteWork',
  components: {
    CTable: () => import('@/components/custom/table/tablePagination')
  },
  data() {
    return {
      dataList: [],
      baseUrl: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    // 编辑
    handleClickTo(data) {
      this.$store.dispatch('utils/setVoteWork', data)
      this.$router.push('/vote/' + this.$route.params.voteId + '/' + data.id)
    },
    // 获取数据
    handlerList(value) {
      this.dataList = value
    },
    getData() {
      return voteWorkList
    }
  }
}
</script>
