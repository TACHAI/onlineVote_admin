<template>
  <div class="vote-theme-page">
    <div class="operation-top">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="$router.push('/active/edit/default')">新增活动</el-button>
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
        <el-table-column prop="title" label="活动名称" />
        <!-- <el-table-column label="活动封面" align="center" width="200">
          <template slot-scope="{row}">
            <el-image
              v-if="row.cover"
              :src="baseUrl + row.cover"
              fit="contain"
            />
            <span v-else>暂无活动封面</span>
          </template>
        </el-table-column> -->
        <el-table-column label="活动地址">
          <template slot-scope="{row}">
            <span>{{ row.address ? row.address : '暂无' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动时间" width="200">
          <template slot-scope="{row}">
            <span>{{ row.activitytime | datetimeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报名人数" prop="count" />
        <el-table-column align="center" label="状态" width="80">
          <template slot-scope="{row}">
            <el-tag :type="row.status === '1' ? 'danger' : 'success'">{{ row.status === '1' ? '下架' : '上架' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="380">
          <template slot-scope="{row}">
            <el-button type="success" size="mini" icon="el-icon-view" @click="handleClickTo(row.id)">查看</el-button>
            <el-button type="success" size="mini" icon="el-icon-shop" @click="handleClickStatus(row.id)">上/下架</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="$router.push('/active/edit/' + row.id)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleClickDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </c-table>
    <!-- <el-dialog :before-close="hanldeReset" :visible.sync="dialogVisible" append-to-body :title="form.id ? '修改活动' : '新增活动'" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="right">
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
          <tinymce v-if="tinymceVisible" ref="edit" :text="form.detail" />
          <el-input v-model="form.detail" style="display: none;" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
          <el-button size="small" @click="hanldeReset">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>

<script>
import { activeDelete, activeStatus, activeList } from '@/api/active'
export default {
  name: 'Active',
  components: {
    // Tinymce: () => import('@/components/custom/tinymce/tinymce'),
    // UploadImage: () => import('@/components/custom/upload/uploadImage'),
    CTable: () => import('@/components/custom/table/tablePagination')
  },
  data() {
    // const validateStartTime = (rule, value, callback) => {
    //   const reg = /((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\s([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
    //   if (!reg.test(value)) return callback(new Error('请填写时间格式'))
    //   return callback()
    // }
    return {
      // dialogVisible: false,
      // form: {
      //   id: '',
      //   title: '',
      //   cover: '',
      //   auther: '',
      //   organizer: '',
      //   address: '',
      //   activitytime: '',
      //   detail: ''
      // },
      // rules: {
      //   id: [],
      //   title: [{ required: true, message: '请填写活动名称' }],
      //   cover: [],
      //   auther: [],
      //   organizer: [],
      //   address: [],
      //   activitytime: [{ required: true, message: '请选择活动时间' }, { validator: validateStartTime }],
      //   detail: ''
      // },
      // imageUploadUrl: process.env.VUE_APP_BASE_API + '/api/upload/uploadImage',
      // fileList: [],
      dataList: [],
      baseUrl: process.env.VUE_APP_BASE_API
    }
  },
  // watch: {
  //   dialogVisible(value) {
  //     this.$nextTick(() => {
  //       this.tinymceVisible = value
  //     })
  //   }
  // },
  methods: {
    // 报名详情
    handleClickTo(id) {
      this.$router.push('/active/' + id)
    },
    // 切换状态
    async handleClickStatus(id) {
      this._globalLoading('正在切换上下架状态')
      const result = await activeStatus(id)
      this.$message.success(result.msg || '更新状态成功')
      this.$refs.table.getData()
    },
    // 编辑
    // handleClickEdit(data) {
    //   this.$store.dispatch('utils/setActive', data)
    //   this.$router.push('/active/edit/' + data.id)
    // },
    // 删除
    async handleClickDelete(id) {
      this._globalLoading('正在进行删除操作')
      const result = await activeDelete(id)
      this.$message.success(result.msg || '删除成功')
      this.$refs.table.getData()
    },
    // 获取数据
    handlerList(value) {
      this.dataList = value
    },
    getData() {
      return activeList
    }
    // 重置表单
    // hanldeReset(done) {
    //   this.fileList = []
    //   this.$refs.form.resetFields()
    //   this.$refs.edit.clear()
    //   if (done && done instanceof Function) {
    //     done()
    //   } else {
    //     this.dialogVisible = false
    //   }
    // },
    // 提交
    // onSubmit() {
    //   this.$refs.form.validate(async valid => {
    //     if (!valid) return false
    //     let request, data
    //     if (this.form.id) {
    //       request = activeUpdate
    //       data = Object.assign(this.form, {})
    //     } else {
    //       request = activeAdd
    //       // eslint-disable-next-line no-unused-vars
    //       const { id, ...reset } = this.form
    //       data = reset
    //     }
    //     data.detail = this.$refs.edit.getContent()
    //     this._globalLoading()
    //     const result = await request(data)
    //     this.$message.success(result.msg || '成功')
    //     this.$refs.form.resetFields()
    //     this.hanldeReset()
    //     this.$refs.table.getData()
    //   })
    // }
  }
}
</script>
