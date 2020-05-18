<template>
  <div>
    <el-upload
      size="small"
      :action="uploadUrl"
      list-type="picture-card"
      :file-list="fileList"
      accept="image/*"
      :limit="1"
      multiple
      :name="uploadName"
      :headers="headers"
      :on-preview="handleUploadPictureCardPreview"
      :on-remove="handleUploadRemove"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :before-upload="handleUploadBefore"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogPreviewVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'changeValue'
  },
  props: {
    headers: {
      type: Object,
      default() {
        return {
          'Authorization': this.$store.getters.token
        }
      }
    },
    uploadName: {
      type: String,
      default: 'file'
    },
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    uploadUrl: {
      type: String,
      default: process.env.VUE_APP_BASE_API + '/api/upload/uploadImage'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogPreviewVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    handleUploadBefore(file) {
      const { type } = file
      if (!(/^image\//.test(type))) {
        this.$message.warning('请上传图片')
        return false
      }
    },
    handleUploadPictureCardPreview(file) {
      if (file.response) {
        this.dialogImageUrl = process.env.VUE_APP_BASE_API + file.response.link
      } else {
        this.dialogImageUrl = file.url
      }
      this.dialogPreviewVisible = true
    },
    handleUploadRemove(file, fileList) {
      const array = this.value.split(',').filter(v => v !== '')
      let url
      if (file.response) {
        url = file.response.link
      } else {
        url = file.url
      }
      const index = array.findIndex(v => new RegExp(v + '$').test(url))
      if (index !== -1) {
        array.splice(index, 1)
      }
      const newValue = array.join(',')
      this.$emit('changeValue', newValue)
    },
    handleUploadSuccess(response, file, fileList) {
      if (response.status === 200) {
        this.$message({
          message: response.msg || '上传成功',
          type: 'success',
          duration: 1000
        })
        const array = this.value.split(',').filter(v => v !== '')
        array.push(response.link)
        const newValue = array.join(',')
        this.$emit('changeValue', newValue)
      } else {
        this.$message({
          message: response.msg || '上传失败',
          type: 'warning',
          duration: 2000
        })
      }
    },
    handleUploadError(error) {
      this.$message({
        message: error.msg || '上传出错',
        type: 'error',
        duration: 2000
      })
    }
  }
}
</script>
