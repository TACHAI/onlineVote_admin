<template>
  <div>
    <el-page-header :content="form.id ? '活动修改' : '活动新增'" style="margin-bottom: 40px;" @back="$router.go(-1)" />
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
      <el-form-item style="display: none;" prop="id">
        <el-input v-model="form.id" size="small" />
      </el-form-item>
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="form.title" size="small" placeholder="请填写活动名称" />
      </el-form-item>
      <el-form-item label="发起人" prop="auther">
        <el-input v-model="form.auther" size="small" placeholder="发起人" />
      </el-form-item>
      <el-form-item label="活动地址" prop="address">
        <el-input v-model="form.address" size="small" placeholder="活动地址" />
      </el-form-item>
      <el-form-item label="组织单位" prop="organizer">
        <el-input v-model="form.organizer" size="small" placeholder="组织单位" />
      </el-form-item>
      <el-form-item label="活动封面" prop="cover">
        <upload-image v-model="form.cover" :file-list="fileList" />
        <el-input v-model="form.cover" style="display: none;" size="small" />
      </el-form-item>
      <el-form-item
        label="活动状态"
        prop="status"
      >
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="0"
          :inactive-value="1"
        />
      </el-form-item>
      <el-form-item label="活动时间" prop="activitytime">
        <el-date-picker
          v-model="form.activitytime"
          type="datetime"
          placeholder="活动时间"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="活动详情" prop="detail">
        <tinymce v-model="form.detail" />
        <el-input v-model="form.detail" style="display: none;" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button size="small">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { activeAdd, activeUpdate, activeDelete, activeStatus, activeList } from '@/api/active'

export default {
  name: 'ActiveAdd',
  components: {
    UploadImage: () => import('@/components/custom/upload/uploadImage'),
    Tinymce: () => import('@/components/custom/tinymce/tinymce')
  },
  data() {
    const validateTime = (rule, value, callback) => {
      const reg = /((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\s([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
      if (!reg.test(value)) return callback(new Error('请填写时间格式'))
      return callback()
    }
    return {
      form: {
        id: '',
        title: '',
        auther: '',
        address: '',
        organizer: '',
        cover: '',
        status: 0,
        activitytime: '',
        detail: ''
      },
      rules: {
        id: [],
        title: [{ required: true, message: '请填写活动名称' }],
        auther: [],
        address: [],
        organizer: [],
        cover: [],
        status: [{ required: true, message: '请选择活动状态' }],
        activitytime: [{ required: true, message: '请选择活动时间' }, { validator: validateTime }],
        detail: []
      },
      imageUploadUrl: process.env.VUE_APP_BASE_API + '/api/upload/uploadImage',
      fileList: []
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        let request, data
        if (this.form.id) {
          request = activeUpdate
          data = this.form
        } else {
          request = activeAdd
          // eslint-disable-next-line no-unused-vars
          const { id, ...reset } = this.form
          data = reset
        }
        const result = await request(data)
        console.log(result)
        this.$message.success(result.msg || '成功')
        this.$refs.form.resetFields()
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style>

</style>
