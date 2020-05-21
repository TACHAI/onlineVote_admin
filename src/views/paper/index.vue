<template>
  <div class="vote-theme-page">
    <div class="operation-top">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增试卷</el-button>
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
        <el-table-column prop="name" label="试卷名称" />
        <el-table-column label="出题人">
          <template slot-scope="{row}">
            <span>{{ row.auther ? row.auther : '暂无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="答题时间(分钟)" prop="examtime" />
        <el-table-column label="试卷介绍">
          <template slot-scope="{row}">
            <span>{{ row.introduction ? row.introduction : '暂无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="{row}">
            <el-button type="success" size="mini" icon="el-icon-view" @click="handleClickTo(row.id)">题目</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleClickEdit(row)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleClickDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </c-table>
    <el-dialog :before-close="hanldeReset" :visible.sync="dialogVisible" append-to-body :title="form.id ? '修改试卷' : '新增试卷'" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="right">
        <el-form-item style="display: none;" prop="id">
          <el-input v-model="form.id" size="small" />
        </el-form-item>
        <el-form-item label="试卷名称" prop="name">
          <el-input v-model="form.name" size="small" placeholder="试卷名称" />
        </el-form-item>
        <el-form-item label="出题人" prop="auther">
          <el-input v-model="form.auther" size="small" placeholder="出题人" />
        </el-form-item>
        <el-form-item label="答题时间" prop="examtime">
          <el-input-number v-model="form.examtime" :min="1" label="答题时间" size="small" />
          分钟
        </el-form-item>
        <el-form-item label="试卷介绍" prop="introduction">
          <el-input v-model="form.introduction" type="textarea" size="small" placeholder="试卷介绍" />
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
import { paperAdd, paperUpdate, paperList, paperDelete } from '@/api/paper'
export default {
  name: 'Paper',
  components: {
    CTable: () => import('@/components/custom/table/tablePagination')
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        id: '',
        name: '',
        auther: '',
        examtime: 1,
        introduction: ''
      },
      rules: {
        id: [],
        name: [{ required: true, message: '请填写试卷名称' }],
        auther: [],
        introduction: [],
        examtime: [{ required: true, message: '请选择考试时间' }]
      },
      imageUploadUrl: process.env.VUE_APP_BASE_API + '/api/upload/uploadImage',
      fileList: [],
      dataList: [],
      baseUrl: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    handleClickTo(id) {
      this.$router.push('/subject/' + id)
    },
    // 编辑
    handleClickEdit(data) {
      const { id, name, auther, introduction, examtime } = data
      this.form.id = id
      this.form.name = name
      this.form.auther = auther
      this.form.introduction = introduction
      this.form.examtime = examtime
      this.dialogVisible = true
    },
    // 删除
    async handleClickDelete(id) {
      this._globalLoading('正在进行删除操作')
      const result = await paperDelete(id)
      this.$message.success(result.msg || '删除成功')
      this.$refs.table.getData()
    },
    // 获取数据
    handlerList(value) {
      this.dataList = value
    },
    getData() {
      return paperList
    },
    // 重置表单
    hanldeReset(done) {
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
          request = paperUpdate
          data = Object.assign(this.form, {})
        } else {
          request = paperAdd
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
