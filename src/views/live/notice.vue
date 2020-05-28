<template>
  <div class="live-notice-page">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item style="display: none;">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="预告标题">
        <el-input v-model="form.name" placeholder="预告标题" />
      </el-form-item>
      <el-form-item label="预告封面">
        <upload-image v-model="form.cover" :file-list="fileList" />
        <el-input v-model="form.cover" style="display: none;" />
      </el-form-item>
      <el-form-item label="演讲人">
        <el-input v-model="form.author" placeholder="演讲人" />
      </el-form-item>
      <el-form-item label="预告内容">
        <el-input v-model="form.content" type="textarea" placeholder="预告内容" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { liveNotice, getLiveNotice } from '@/api/live'
export default {
  name: 'LiveNotice',
  components: {
    UploadImage: () => import('@/components/custom/upload/uploadImage')
  },
  data() {
    return {
      form: {
        id: 1,
        name: '',
        cover: '',
        author: '',
        content: ''
      },
      fileList: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        this._globalLoading()
        const result = await liveNotice(this.form)
        this.$message.success(result.msg || '成功')
      })
    },
    async getData() {
      const result = await getLiveNotice()
      const { id, name, cover, author, content } = result.data
      this.form = { id, name, cover, author, content }
      this.fileList.push({ url: process.env.VUE_APP_BASE_API + cover, name: cover })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
