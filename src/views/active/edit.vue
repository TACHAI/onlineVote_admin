<template>
  <div class="active-edit-page">
    <el-page-header :content="$route.params.activeId === 'default' ? '新增活动' : '修改活动'" style="padding: 10px 20px 20px;" @back="$router.go(-1)" />
    <el-form v-if="!loading" ref="form" :model="form" :rules="rules" label-width="110px" label-position="right">
      <el-form-item style="display: none;" prop="id">
        <el-input v-model="form.id" size="small" />
      </el-form-item>
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="form.title" size="small" placeholder="活动名称" />
      </el-form-item>
      <el-form-item label="活动封面" prop="cover">
        <upload-image v-model="form.cover" :file-list="fileList" />
        <el-input v-model="form.cover" style="display: none;" size="small" />
      </el-form-item>
      <el-form-item label="发起人" prop="auther">
        <el-input v-model="form.auther" size="small" placeholder="发起人" />
      </el-form-item>
      <el-form-item label="组织单位" prop="organizer">
        <el-input v-model="form.organizer" size="small" placeholder="组织单位" />
      </el-form-item>
      <el-form-item label="活动地址" prop="address">
        <el-input v-model="form.address" size="small" placeholder="活动地址" />
      </el-form-item>
      <el-form-item label="活动时间" prop="activitytime">
        <el-date-picker
          v-model="form.activitytime"
          type="datetime"
          placeholder="活动时间"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-value="form.activitytime"
        />
      </el-form-item>
      <el-form-item label="活动详情" prop="detail">
        <tinymce ref="edit" :text="form.detail" />
        <el-input v-model="form.detail" style="display: none;" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { activeAdd, activeUpdate, activeSelectById } from '@/api/active'
import { datetimeFormat2 } from '../../utils/utils'
export default {
  name: 'ActiveEdit',
  components: {
    Tinymce: () => import('@/components/custom/tinymce/tinymce'),
    UploadImage: () => import('@/components/custom/upload/uploadImage')
  },
  data() {
    const validateStartTime = (rule, value, callback) => {
      const reg = /((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\s([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
      if (!reg.test(value)) return callback(new Error('请填写时间格式'))
      return callback()
    }
    return {
      form: {
        id: '',
        title: '',
        cover: '',
        auther: '',
        organizer: '九江市图书馆',
        address: '',
        activitytime: '',
        detail: ''
      },
      rules: {
        id: [],
        title: [{ required: true, message: '请填写活动名称' }],
        cover: [{ required: true, message: '请上传活动封面' }],
        auther: [],
        organizer: [],
        address: [],
        activitytime: [{ required: true, message: '请选择活动时间' }, { validator: validateStartTime }],
        detail: ''
      },
      imageUploadUrl: process.env.VUE_APP_BASE_API + '/api/upload/uploadImage',
      fileList: [],
      loading: true
    }
  },
  async created() {
    const { activeId } = this.$route.params
    if (activeId === 'default') {
      this.loading = false
    } else {
      try {
        const result = await activeSelectById(activeId)
        const { id, title, cover, auther, organizer, address, activitytime, detail } = result.data
        this.form.id = id
        this.form.title = title
        this.form.cover = cover
        this.form.auther = auther
        this.form.organizer = organizer
        this.form.address = address
        this.form.activitytime = datetimeFormat2(activitytime)
        this.form.detail = detail
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
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        let request, data
        if (this.form.id) {
          request = activeUpdate
          data = Object.assign(this.form, {})
        } else {
          request = activeAdd
          // eslint-disable-next-line no-unused-vars
          const { id, ...reset } = this.form
          data = reset
        }
        data.detail = this.$refs.edit.getContent()
        this._globalLoading()
        const result = await request(data)
        this.$message.success(result.msg || '成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>
