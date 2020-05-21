<template>
  <div class="vote-operation">
    <el-page-header :content="$route.params.workId === 'default' ? '新增作品' : '修改作品'" style="padding: 10px 20px 20px;" @back="$router.go(-1)" />
    <div v-if="!loading" class="container">
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
          <tinymce ref="edit" :text="form.introduction" />
          <el-input v-model="form.introduction" type="textarea" style="display: none;" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { voteWorkUpdate, voteWorkAdd, voteWorkSelectById } from '@/api/voteWork'
export default {
  name: 'VoteOperation',
  components: {
    Tinymce: () => import('@/components/custom/tinymce/tinymce'),
    UploadImage: () => import('@/components/custom/upload/uploadImage')
  },
  data() {
    return {
      loading: true,
      form: {
        id: '',
        name: '',
        cover: '',
        auther: '',
        voteId: this.$route.params.voteId,
        introduction: ''
      },
      rules: {
        id: [],
        name: [{ required: true, message: '请填写作品名称' }],
        cover: [{ required: true, message: '请上传作品封面' }],
        auther: [{ required: true, message: '请填写作者' }],
        voteId: [{ required: true, message: '请选择活动' }],
        introduction: []
      },
      fileList: []
    }
  },
  async created() {
    const { workId } = this.$route.params
    if (workId === 'default') {
      this.loading = false
    } else {
      try {
        const result = await voteWorkSelectById(workId)
        const { id, name, cover, auther, voteId, introduction } = result.data
        this.form.id = id
        this.form.name = name
        this.form.cover = cover
        this.form.auther = auther
        this.form.voteId = voteId
        this.form.introduction = introduction
        if (cover) {
          this.fileList = [{ name: '封面', url: process.env.VUE_APP_BASE_API + cover }]
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        let request, data
        if (this.$route.params.workId !== 'default') {
          request = voteWorkUpdate
          data = this.form
        } else {
          request = voteWorkAdd
          // eslint-disable-next-line no-unused-vars
          const { id, ...reset } = this.form
          data = reset
        }
        this._globalLoading()
        data.introduction = this.$refs.edit.getContent()
        const result = await request(data)
        this.$message.success(result.msg || '成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>
