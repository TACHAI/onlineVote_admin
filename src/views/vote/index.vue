<template>
  <div class="vote-page">
    <div class="operation-top">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增主题活动</el-button>
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
        <el-table-column label="活动介绍">
          <template slot-scope="{row}">
            <p class="c_text_overflow">{{ row.introduction ? row.introduction : '暂无活动介绍' }}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="活动封面" align="center" width="180">
          <template slot-scope="{row}">
            <el-image
              v-if="row.cover"
              :src="baseUrl + row.cover"
              fit="contain"
            />
            <span v-else>暂无活动封面</span>
          </template>
        </el-table-column> -->
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
    <el-dialog :before-close="hanldeReset" :visible.sync="dialogVisible" :title="form.id ? '修改活动' : '新增活动'" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="right">
        <el-form-item style="display: none;" prop="id">
          <el-input v-model="form.id" size="small" />
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name" size="small" placeholder="请填写活动介绍" />
        </el-form-item>
        <el-form-item label="活动介绍" prop="introduction">
          <el-input v-model="form.introduction" :show-word-limit="true" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea" size="small" placeholder="请填写活动介绍" />
        </el-form-item>
        <el-form-item label="活动封面" prop="cover">
          <upload-image v-model="form.cover" :file-list="fileList" />
          <el-input v-model="form.cover" style="display: none;" size="small" />
        </el-form-item>
        <el-form-item label="组织单位" prop="organizer">
          <el-input v-model="form.organizer" size="small" placeholder="请填组织单位" />
        </el-form-item>
        <el-form-item label="作品上传时间" class="c_date" required>
          <el-row>
            <el-col :span="11">
              <el-form-item prop="ustartTime">
                <el-date-picker
                  v-model="form.ustartTime"
                  type="datetime"
                  placeholder="开始时间"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-value="form.ustartTime"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-form-item prop="uendTime">
                <el-date-picker
                  v-model="form.uendTime"
                  type="datetime"
                  placeholder="截止时间"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-value="form.uendTime"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投票时间" class="c_date" required>
          <el-row>
            <el-col :span="11">
              <el-form-item prop="vstartTime">
                <el-date-picker
                  v-model="form.vstartTime"
                  type="datetime"
                  placeholder="开始时间"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-value="form.vstartTime"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-form-item prop="vendTime">
                <el-date-picker
                  v-model="form.vendTime"
                  type="datetime"
                  placeholder="截止时间"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-value="form.vendTime"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label="活动上/下架"
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
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
          <el-button size="small" @click="hanldeReset">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { voteAdd, voteUpdate, voteDelete, voteList } from '@/api/vote'
import { datetimeFormat2 } from '@/utils/utils'
export default {
  name: 'Vote',
  components: {
    UploadImage: () => import('@/components/custom/upload/uploadImage'),
    CTable: () => import('@/components/custom/table/tablePagination')
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
        cover: [],
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
      baseUrl: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
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

