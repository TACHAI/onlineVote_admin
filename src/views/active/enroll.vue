<template>
  <div class="enroll-page">
    <el-page-header content="报名人员列表" style="padding: 10px 20px 20px;" @back="$router.go(-1)" />
    <div class="operation-top">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增报名用户</el-button>
    </div>
    <c-table ref="table" :handler="getData" :custom-data="[$route.params.activeId]" @handlerlist="handlerList">
      <el-table
        :data="dataList"
        style="width: 100%"
        border
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="phone"
          label="手机号"
        />
        <el-table-column
          label="备注"
        >
          <template slot-scope="{row}">
            <span>{{ row.detail ? row.detail : '暂无描述' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户报名时间">
          <template slot-scope="{row}">
            <span>{{ row.createTime | datetimeFormat }}</span>
          </template>
        </el-table-column>
      </el-table>
    </c-table>
    <el-dialog :before-close="hanldeReset" :visible.sync="dialogVisible" title="新增报名用户" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right">
        <el-form-item style="display: none;" prop="activityId">
          <el-input v-model="form.activityId" size="small" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" size="small" placeholder="名称" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" size="small" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="备注" prop="detail">
          <el-input v-model="form.detail" type="textarea" size="small" placeholder="描述" />
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
import { activeUserAdd, activeUserList } from '@/api/active'
export default {
  name: 'Enroll',
  components: {
    CTable: () => import('@/components/custom/table/tablePagination')
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!/^1[3|4|5|6|7|8][0-9]{9}$/.test(value)) return callback(new Error('请填写正确的手机号'))
      return callback()
    }
    return {
      dialogVisible: false,
      form: {
        activityId: this.$route.params.activeId,
        name: '',
        phone: '',
        detail: ''
      },
      rules: {
        activityId: [{ required: true }],
        name: [{ required: true, message: '请填写名称' }],
        phone: [{ required: true, message: '请填写手机号' }, { validator: checkPhone }],
        detail: []
      },
      dataList: []
    }
  },
  methods: {
    // 获取数据
    handlerList(value) {
      this.dataList = value
    },
    getData() {
      return activeUserList
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
        this._globalLoading()
        const result = await activeUserAdd(this.form)
        this.$message.success(result.msg || '成功')
        this.hanldeReset()
        this.$refs.table.getData()
      })
    }
  }
}
</script>
