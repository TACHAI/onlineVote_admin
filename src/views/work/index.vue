<template>
  <div class="vote-page">
    <div class="operation-top">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增投票作品</el-button>
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
        <el-table-column label="主题" prop="name" />
        <el-table-column label="投稿时间" align="center" width="190">
          <template slot-scope="{row}">
            <span>{{ row.ustartTime | datetimeFormat }} ~ {{ row.uendTime | datetimeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="投票时间" align="center" width="190">
          <template slot-scope="{row}">
            <span>{{ row.vstartTime | datetimeFormat }} ~ {{ row.vendTime | datetimeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织单位" width="120">
          <template slot-scope="{row}">
            <span>{{ row.organizer ? row.organizer : '暂无组织单位' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="{row}">
            <el-button type="success" size="mini" icon="el-icon-position" @click="handleClickTo(row.id)">投稿作品</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleClickEdit(row)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleClickDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </c-table>
  </div>
</template>

<script>
import { voteAdd, voteUpdate, voteDelete, voteList } from '@/api/vote'
import { datetimeFormat2 } from '@/utils/utils'
import { VueEditor, Quill } from 'vue2-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
import request from '@/utils/request'
export default {
  name: 'Vote',
  components: {
    UploadImage: () => import('@/components/custom/upload/uploadImage'),
    CTable: () => import('@/components/custom/table/tablePagination'),
    VueEditor
  },
  data() {
    const validateStartTime = (rule, value, callback) => {
      const reg = /((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\s([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
      if (!reg.test(value)) return callback(new Error('请填写时间格式'))
      return callback()
    }
    const validateEndTime1 = (rule, value, callback) => {
      const reg = /((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\s([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
      if (!reg.test(value)) return callback(new Error('请填写时间格式'))
      if (value < this.form.ustartTime) return callback(new Error('截止时间要大于开始时间'))
      return callback()
    }
    const validateEndTime2 = (rule, value, callback) => {
      const reg = /((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\s([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
      if (!reg.test(value)) return callback(new Error('请填写时间格式'))
      if (value < this.form.vstartTime) return callback(new Error('截止时间要大于开始时间'))
      return callback()
    }
    return {
      dialogVisible: false,
      form: {
        id: '',
        name: '',
        introduction: '',
        cover: '',
        organizer: '',
        status: 0,
        ustartTime: '',
        uendTime: '',
        vstartTime: '',
        vendTime: ''
      },
      rules: {
        id: [],
        name: [{ required: true, message: '请填写活动名称' }],
        introduction: [],
        cover: [{ required: true, message: '请上传封面图' }],
        organizer: [],
        status: [{ required: true, type: 'number', message: '请选择状态' }],
        ustartTime: [{ required: true, message: '作品上传开始时间' }, { validator: validateStartTime }],
        uendTime: [{ required: true, message: '作品上传截止时间' }, { validator: validateEndTime1 }],
        vstartTime: [{ required: true, message: '投票开始时间' }, { validator: validateStartTime }],
        vendTime: [{ required: true, message: '投票截止时间' }, { validator: validateEndTime2 }]
      },
      imageUploadUrl: process.env.VUE_APP_BASE_API + '/api/upload/uploadImage',
      fileList: [],
      dataList: [],
      baseUrl: process.env.VUE_APP_BASE_API,
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'size': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }], // 字体颜色，字体背景颜色
        [{ 'align': [] }], // 对齐方式
        ['link'],
        ['clean'],
        ['image']
      ],
      customModulesForEditor: [
        { alias: 'imageDrop', module: ImageDrop },
        { alias: 'imageResize', module: ImageResize }
      ],
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {}
        }
      }
    }
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      this._globalLoading('正在上传图片')
      var formData = new FormData()
      formData.append('file', file)
      request({
        url: '/api/upload/uploadImage',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(result => {
          if (result.status === 200) {
            Editor.insertEmbed(cursorLocation, 'image', process.env.VUE_APP_BASE_API + result.link)
          } else {
            this.$message.warning('上传失败')
          }
          resetUploader()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleClickTo(id) {
      this.$router.push('/vote/' + id)
    },
    // 编辑
    handleClickEdit(data) {
      const { id, cover, introduction, name, organizer, status, uendTime, ustartTime, vendTime, vstartTime } = data
      if (cover) {
        this.fileList = [{ name: '封面', url: process.env.VUE_APP_BASE_API + cover }]
      }
      this.form = {
        id, cover, introduction, name, organizer, status, uendTime: datetimeFormat2(uendTime), ustartTime: datetimeFormat2(ustartTime), vendTime: datetimeFormat2(vendTime), vstartTime: datetimeFormat2(vstartTime)
      }
      this.dialogVisible = true
    },
    // 删除
    async handleClickDelete(id) {
      this._globalLoading()
      const result = await voteDelete(id)
      this.$message.success(result.msg || '删除成功')
      this.$refs.table.getData()
    },
    // 获取数据
    handlerList(value) {
      this.dataList = value
    },
    getData() {
      return voteList
    },
    // 重置表单
    hanldeReset(done) {
      this.fileList = []
      this.$refs.form.resetFields()
      if (done && done instanceof Function) {
        done()
      } else {
        this.dialogVisible = false
      }
    },
    // 提交
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        let request, data
        if (this.form.id) {
          request = voteUpdate
          data = this.form
        } else {
          request = voteAdd
          // eslint-disable-next-line no-unused-vars
          const { id, ...reset } = this.form
          data = reset
        }
        this._globalLoading()
        const result = await request(data)
        this.$message.success(result.msg || '成功')
        this.hanldeReset()
        this.$refs.table.getData()
      })
    }
  }
}
</script>

