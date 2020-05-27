<template>
  <div class="vote-theme-page">
    <el-page-header content="题目列表" style="padding: 10px 20px 20px;" @back="$router.go(-1)" />
    <div class="operation-top">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增题目</el-button>
    </div>
    <c-table ref="table" :handler="getData" :custom-data="[$route.params.paperId]" @handlerlist="handlerList">
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
        <el-table-column prop="questionName" label="题目" />
        <el-table-column prop="point" label="分值" />
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="success" size="mini" icon="el-icon-view" @click="handleClickEdit(row)">设置答案</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleClickDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </c-table>
    <el-dialog width="60%" :before-close="hanldeReset" :visible.sync="dialogVisible" append-to-body :title="form.id ? '设置答案' : '新增题目'" :close-on-click-modal="false">
      <el-row :gutter="20">
        <el-col :span="form.id ? 10 : 24">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right">
            <el-form-item style="display: none;" prop="id">
              <el-input v-model="form.id" size="small" />
            </el-form-item>
            <el-form-item style="display: none;" prop="type">
              <el-input v-model="form.type" size="small" />
            </el-form-item>
            <el-form-item style="display: none;" prop="paperId">
              <el-input v-model="form.paperId" size="small" />
            </el-form-item>
            <el-form-item label="题目" prop="questionName">
              <el-input v-model="form.questionName" size="small" placeholder="试卷名称" />
            </el-form-item>
            <el-form-item label="分值" prop="point">
              <el-input-number v-model="form.point" :min="1" size="small" />
            </el-form-item>
            <el-form-item v-show="form.id" label="答案" prop="answer">
              <el-select v-model="form.answer" clearable placeholder="选择答案">
                <el-option v-for="item of answerList" :key="item.id" :value="item.id" :label="item.answer" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="form.id" label="答案解析" prop="answerDetail">
              <el-input v-model="form.answerDetail" type="textarea" size="small" placeholder="答案解析" />
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
              <el-button size="small" @click="hanldeReset">关闭</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="form.id ? 14 : 0">
          <div>
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="answerDialogVisible = true">新增答案</el-button>
            <el-table :data="answerList">
              <el-table-column prop="answer" />
              <el-table-column align="center">
                <template slot-scope="{row}">
                  <el-button type="primary" size="mini" @click="handleClickEditAnswer(row)">修改</el-button>
                  <el-button type="danger" size="mini" @click="handleClickDeleteAnswer(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog width="50%" :before-close="hanldeResetAnswer" :visible.sync="answerDialogVisible" append-to-body :title="answerForm.id ? '修改答案' : '新增答案'" :close-on-click-modal="false">
      <el-form ref="answerForm" :model="answerForm" :rules="answerRules" label-width="80px" label-position="right">
        <el-form-item style="display: none;" prop="id">
          <el-input v-model="answerForm.id" />
        </el-form-item>
        <el-form-item style="display: none;" prop="questionId">
          <el-input v-model="answerForm.questionId" />
        </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input v-model="answerForm.answer" size="mini" placeholder="答案" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmitAnswer">提交</el-button>
          <el-button size="mini" @click="hanldeResetAnswer">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { subjectAdd, subjectUpdate, subjectList, subjectDelete } from '@/api/subject'
import { answerAdd, answerUpdate, answerDelete, answerList } from '@/api/answer'
export default {
  name: 'Subject',
  components: {
    CTable: () => import('@/components/custom/table/tablePagination')
  },
  data() {
    return {
      dialogVisible: false,
      dataList: [],
      form: {
        id: '',
        type: '',
        questionName: '',
        point: 1,
        answer: '',
        answerDetail: '',
        paperId: this.$route.params.paperId
      },
      answerDialogVisible: false,
      answerList: [],
      answerForm: {
        id: '',
        answer: '',
        questionId: ''
      },
      answerRules: {
        id: [],
        answer: [{ required: true, message: '请填写答案' }],
        questionId: [{ required: true, message: '请填写题目id' }]
      }
    }
  },
  computed: {
    rules() {
      let json
      if (this.form.id) {
        json = {
          answer: [{ required: true, message: '请选择答案' }]
        }
      } else {
        json = {
          answer: []
        }
      }
      return Object.assign({
        id: [],
        type: [],
        questionName: [{ required: true, message: '请填写题目' }],
        point: [{ required: true, message: '请选择分值' }],
        answerDetail: [],
        paperId: [{ required: true, message: '请填写试卷id' }]
      }, json)
    }
  },
  methods: {
    // 修改答案
    handleClickEditAnswer(data) {
      const { answer, id } = data
      this.answerForm.answer = answer
      this.answerForm.id = id
      this.answerDialogVisible = true
    },
    // 删除答案
    async handleClickDeleteAnswer(id) {
      this._globalLoading('正在进行删除操作')
      const result = await answerDelete(id)
      this.$message.success(result.msg || '删除成功')
      this.getAnswerData()
    },
    // 重置表单
    hanldeResetAnswer(done) {
      this.answerForm.id = ''
      this.answerForm.answer = ''
      this.$refs.answerForm.clearValidate()
      if (done && done instanceof Function) {
        done()
      } else {
        this.answerDialogVisible = false
      }
    },
    // 提交
    onSubmitAnswer() {
      this.$refs.answerForm.validate(async valid => {
        if (!valid) return false
        let request, data
        if (this.answerForm.id) {
          request = answerUpdate
          data = Object.assign(this.answerForm, {})
        } else {
          request = answerAdd
          // eslint-disable-next-line no-unused-vars
          const { id, ...reset } = this.answerForm
          data = reset
        }
        this._globalLoading()
        const result = await request(data)
        this.$message.success(result.msg || '成功')
        this.hanldeResetAnswer()
        this.getAnswerData()
      })
    },
    // 获取答案列表
    async getAnswerData() {
      const result = await answerList(this.form.id)
      this.answerList = result.data
    },
    // 编辑
    async handleClickEdit(data) {
      const { id, type, questionName, point, answerDetail, answer } = data
      this.form.id = id
      this.form.type = type
      this.form.questionName = questionName
      this.form.point = point
      this.form.answerDetail = answerDetail
      this.form.answer = answer ? Number(answer) : null
      this.answerForm.questionId = id
      try {
        await this.getAnswerData()
      } catch (error) {
        console.log(error)
      } finally {
        this.dialogVisible = true
      }
    },
    // 删除
    async handleClickDelete(id) {
      this._globalLoading('正在进行删除操作')
      const result = await subjectDelete(id)
      this.$message.success(result.msg || '删除成功')
      this.$refs.table.getData()
    },
    // 获取数据
    handlerList(value) {
      this.dataList = value
    },
    getData() {
      return subjectList
    },
    // 重置表单
    hanldeReset(done) {
      this.awswerList = []
      this.form = {
        id: '',
        type: '',
        questionName: '',
        point: 1,
        answer: '',
        answerDetail: '',
        paperId: this.$route.params.paperId
      }
      this.answerForm = {
        id: '',
        questionId: '',
        answer: ''
      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
        if (done && done instanceof Function) {
          done()
        } else {
          this.dialogVisible = false
        }
      })
    },
    // 提交
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        let request, data
        if (this.form.id) {
          request = subjectUpdate
          data = Object.assign(this.form, {})
        } else {
          request = subjectAdd
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
