<template>
  <div class="vote-exhibition-page">
    <el-page-header content="作品列表" style="padding: 10px 20px 20px;" @back="$router.go(-1)" />
    <div class="operation-top">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="$router.push('/vote/'+$route.params.voteId + '/default')">新增作品</el-button>
    </div>
    <c-table ref="table" :custom-data="[$route.params.voteId]" :handler="getData" @handlerlist="handlerList">
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
        <!-- <el-table-column label="作品封面" align="center" width="180">
          <template slot-scope="{row}">
            <el-image
              v-if="row.cover"
              :src="baseUrl + row.cover"
              fit="contain"
            />
            <span v-else>暂无活动封面</span>
          </template>
        </el-table-column> -->
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
            <el-button type="success" size="mini" icon="el-icon-edit" @click="$router.push('/vote/' + $route.params.voteId + '/' + row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </c-table>
    <!-- <el-dialog
      :before-close="hanldeReset"
      :visible.sync="dialogVisible"
      :title="form.id ? '修改作品' : '新增作品'"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="right">
        <el-form-item style="display: none;" prop="id">
          <el-input v-model="form.id" size="small" />
        </el-form-item>
        <el-form-item label="作品名称" prop="name">
          <el-input v-model="form.name" size="small" placeholder="请填写活动介绍" />
        </el-form-item>
        <el-form-item label="作品封面" prop="cover">
          <upload-image v-model="form.cover" :file-list="fileList" />
          <el-input v-model="form.cover" style="display: none;" size="small" />
        </el-form-item>
        <el-form-item label="作者" prop="auther">
          <el-input v-model="form.auther" size="small" placeholder="请填作者" />
        </el-form-item>
        <el-form-item style="display:none;">
          <el-input v-model="form.voteId" />
        </el-form-item>
        <el-form-item label="作品详情">
          <tinymce v-if="tinymceVisible" ref="edit" :text="form.introduction" />
          <el-input v-model="form.introduction" type="textarea" style="display: none;" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
          <el-button size="small" @click="hanldeReset">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->

    <el-dialog :visible.sync="viewDialogVisible" title="作品预览" :close-on-click-modal="false" width="640px">
      <div v-if="viewInfo" class="view">
        <h3 class="title">{{ viewInfo.name }}</h3>
        <span class="auther">{{ viewInfo.auther }}</span>
        <div class="info" v-html="viewInfo.introduction" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { voteWorkList } from '@/api/voteWork'
export default {
  name: 'VoteWork',
  components: {
    CTable: () => import('@/components/custom/table/tablePagination')
    // UploadImage: () => import('@/components/custom/upload/uploadImage'),
    // Tinymce: () => import('@/components/custom/tinymce/tinymce')
  },
  data() {
    return {
      dataList: [],
      baseUrl: process.env.VUE_APP_BASE_API,
      viewDialogVisible: false,
      viewInfo: null
      // dialogVisible: false,
      // form: {
      //   id: '',
      //   name: '',
      //   cover: '',
      //   auther: '',
      //   voteId: this.$route.params.voteId,
      //   introduction: ''
      // },
      // rules: {
      //   id: [],
      //   name: [{ required: true, message: '请填写作品名称' }],
      //   cover: [{ required: true, message: '请上传作品封面' }],
      //   auther: [{ required: true, message: '请填写作者' }],
      //   voteId: [{ required: true, message: '请选择活动' }],
      //   introduction: []
      // },
      // fileList: [],
      // tinymceVisible: false
    }
  },
  // watch: {
  //   dialogVisible(value) {
  //     this.$nextTick(() => {
  //       this.tinymceVisible = value
  //     })
  //   }
  // },
  methods: {
    // 编辑
    // handleClickEdit(data) {
    //   const { id, name, cover, auther, voteId, introduction } = data
    //   if (cover) {
    //     this.fileList = [{ name: '封面', url: process.env.VUE_APP_BASE_API + cover }]
    //   }
    //   this.form = {
    //     id, name, cover, auther, voteId, introduction
    //   }
    //   this.dialogVisible = true
    // },
    // 重置表单
    // hanldeReset(done) {
    //   this.fileList = []
    //   this.$refs.edit.clear()
    //   this.$refs.form.resetFields()
    //   if (done && done instanceof Function) {
    //     done()
    //   } else {
    //     this.dialogVisible = false
    //   }
    // },
    // 提交
    // onSubmit() {
    //   this.$refs.form.validate(async valid => {
    //     if (!valid) return false
    //     let request, data
    //     if (this.form.id) {
    //       request = voteWorkUpdate
    //       data = Object.assign(this.form, {})
    //     } else {
    //       request = voteWorkAdd
    //       // eslint-disable-next-line no-unused-vars
    //       const { id, ...reset } = this.form
    //       data = reset
    //     }
    //     this._globalLoading()
    //     data.introduction = this.$refs.edit.getContent()
    //     const result = await request(data)
    //     this.$message.success(result.msg || '成功')
    //     this.hanldeReset()
    //     this.$refs.table.getData()
    //   })
    // },
    handleClickView(data) {
      this.viewInfo = data
      this.viewDialogVisible = true
    },
    // 编辑
    // handleClickTo(data) {
    //   this.$store.dispatch('utils/setVoteWork', data)
    //   this.$router.push('/vote/' + this.$route.params.voteId + '/' + data.id)
    // },
    // 获取数据
    handlerList(value) {
      this.dataList = value
    },
    getData() {
      return voteWorkList
    }
  },
  beforeRouteEnter(to, from, next) {
    if (/\/vote\/[1-9]\d*\/(default|[1-9]\d*)/.test(from.path)) {
      console.log(1)
      next(vm => {
        vm.$refs.table.getData()
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
  .view {
    .title {
      text-align: center;
    }
    .auther {
      display: inline-block;
      width: 100%;
      text-align: center;
      line-height: 2;
    }
    .info {
      margin-top: 20px;
    }
  }
</style>
