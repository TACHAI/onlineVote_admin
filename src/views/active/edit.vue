<template>
  <div class="active-edit-page">
    <el-page-header :content="$route.params.activeId === 'default' ? '新增活动' : '修改活动'" style="padding: 10px 20px 20px;" @back="$router.go(-1)" />
    <el-form v-if="!loading" ref="form" :model="form" :rules="rules" label-width="110px" label-position="right">
      <el-form-item style="display: none;" prop="id">
        <el-input v-model="form.id" size="small" />
      </el-form-item>
      <el-form-item label="投票活动名称" prop="name">
        <el-input v-model="form.name" size="small" placeholder="投票活动名称" />
      </el-form-item>
      <el-form-item label="投票活动封面" prop="cover">
        <upload-image v-model="form.image" :file-list="fileList" />
        <el-input v-model="form.image" style="display: none;" size="small" />
      </el-form-item>
      <el-form-item label="投票类型" prop="type">
        <template>
          <el-radio v-model="form.type" label="0">主题活动</el-radio>
          <el-radio v-model="form.type" label="1">本馆活动</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="参赛方式" prop="address">
        <el-input v-model="form.entryMethod"
                  type="textarea"
                  maxlength="300"
                  show-word-limit
                  placeholder="参赛方式" />
      </el-form-item>
      <el-form-item label="参赛对象" prop="participants">
        <el-input v-model="form.participants" type="textarea"
                  maxlength="300"
                  show-word-limit
                  placeholder="参赛对象" />
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
      <el-form-item label="活动详情" prop="content">
<!--        <tinymce ref="edit" :text="form.content" />-->
        <el-input v-model="form.content"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="300"
                  show-word-limit />
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
    // Tinymce: () => import('@/components/custom/tinymce/tinymce'),
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
        name: '',
        image: '',
        type:1,
        entryMethod: '',
        participants: '',
        activitytime: '',
        content: ''
      },
      rules: {
        id: [],
        name: [{ required: true, message: '请填写投票活动名称' }],
        image: [{ required: true, message: '请上传投票活动封面' }],
        entryMethod: [],
        participants: [],
        activitytime: [{ required: true, message: '请选择投票活动时间' }, { validator: validateStartTime }],
        content: ''
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
        const { id, name, image, entryMethod, participants, activitytime, content } = result.data
        this.form.id = id
        this.form.name = name
        this.form.image = image
        this.form.entryMethod = entryMethod
        this.form.participants = participants
        this.form.activitytime = datetimeFormat2(activitytime)
        this.form.content = content
        if (image) {
          this.fileList = [{ name: '封面', url: process.env.VUE_APP_BASE_API + image }]
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
        // data.content = this.$refs.edit.getContent()
        this._globalLoading()
        const result = await request(data)
        this.$message.success(result.msg || '成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>
