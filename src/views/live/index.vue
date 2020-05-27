<template>
  <div class="vote-theme-page">
    <div class="operation-top">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增直播</el-button>
    </div>
    <c-table ref="table" :handler="getData" :custom-data="['', '']" @handlerlist="handlerList">
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
        <el-table-column prop="title" label="直播标题" />
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
        <el-table-column label="演讲人">
          <template slot-scope="{row}">
            <span>{{ row.auther ? row.auther : '暂无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="直播地点">
          <template slot-scope="{row}">
            <span>{{ row.address ? row.address : '暂无' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="直播公告" width="200">
          <template slot-scope="{row}">
            <span>{{ row.introduction }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="报名人数" prop="count" /> -->
        <el-table-column align="center" label="状态" width="100">
          <template slot-scope="{row}">
            <el-tag :type="row.status === 0 ? 'success' : 'danger'">{{ row.status === 0 ? '直播' : '往期回顾' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="380">
          <template slot-scope="{row}">
            <el-button type="success" size="mini" icon="el-icon-view" @click="getLiveStream(row.id)">查看</el-button>
            <el-button type="success" size="mini" icon="el-icon-shop" @click="handleClickStatus(row)">上/下架</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleClickEdit(row)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleClickDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </c-table>
    <el-dialog :before-close="hanldeReset" :visible.sync="dialogVisible" append-to-body :title="form.id ? '修改活动' : '新增活动'" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="right">
        <el-form-item style="display: none;" prop="id">
          <el-input v-model="form.id" size="small" />
        </el-form-item>
        <el-form-item label="直播主题" prop="title">
          <el-input v-model="form.title" size="small" placeholder="直播主题" />
        </el-form-item>
        <el-form-item label="直播封面" prop="cover">
          <upload-image v-model="form.cover" :file-list="fileList" />
          <el-input v-model="form.cover" style="display: none;" size="small" />
        </el-form-item>
        <el-form-item label="演讲人" prop="auther">
          <el-input v-model="form.auther" size="small" placeholder="演讲人" />
        </el-form-item>
        <el-form-item label="直播地点" prop="address">
          <el-input v-model="form.address" size="small" placeholder="直播地点" />
        </el-form-item>
        <el-form-item label="直播介绍" prop="introduction">
          <el-input v-model="form.introduction" type="textarea" size="small" placeholder="直播介绍" />
        </el-form-item>
        <el-form-item label="允许回看" prop="replay">
          <el-radio-group v-model="form.replay">
            <el-radio :label="0">回看</el-radio>
            <el-radio :label="1">不回看</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="form.status === 2" label="视频" prop="video">
          <upload-file v-model="form.video" :file-list="fileList2" />
          <el-input v-model="form.video" style="display: none;" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
          <el-button size="small" @click="hanldeReset">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="streamDialogVisible" append-to-body title="直播流信息" :close-on-click-modal="false">
      <el-form :model="streamInfo" label-width="120px" label-position="right">
        <el-form-item label="流名称">
          <el-input v-model="streamInfo.videoStreamName" />
        </el-form-item>
        <el-form-item label="流ID">
          <el-input v-model="streamInfo.stramId" />
        </el-form-item>
        <el-form-item label="流数据ID">
          <el-input v-model="streamInfo.fileAddress" />
        </el-form-item>
        <el-form-item label="推流地址">
          <el-input v-model="streamInfo.pushStramAddress" />
        </el-form-item>
        <el-form-item label="M3U8拉流地址">
          <el-input v-model="streamInfo.m3u8PullAddress" />
        </el-form-item>
        <el-form-item label="RTMP拉流地址">
          <el-input v-model="streamInfo.rtmpPullAddress" />
        </el-form-item>
        <el-form-item label="M3U8下载地址">
          <el-input v-model="streamInfo.m3u8Address" />
        </el-form-item>
        <el-form-item label="MP4下载地址">
          <el-input v-model="streamInfo.mp4Address" />
        </el-form-item>
        <el-form-item label="原始流名称">
          <el-input v-model="streamInfo.pullStreamAddress" />
        </el-form-item>
        <el-form-item label="是否回看">
          <el-radio-group v-model="streamInfo.replay">
            <el-radio :label="0">回看</el-radio>
            <el-radio :label="1">不回看</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { liveDelete, liveAdd, liveUpdate, liveList, getLiveStream } from '@/api/live'
export default {
  name: 'Live',
  components: {
    UploadImage: () => import('@/components/custom/upload/uploadImage'),
    CTable: () => import('@/components/custom/table/tablePagination'),
    UploadFile: () => import('@/components/custom/upload/uploadFile')
  },
  data() {
    // const validateStartTime = (rule, value, callback) => {
    //   const reg = /((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\s([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
    //   if (!reg.test(value)) return callback(new Error('请填写时间格式'))
    //   return callback()
    // }
    return {
      dialogVisible: false,
      form: {
        id: '',
        title: '',
        cover: '',
        auther: '',
        address: '',
        introduction: '',
        replay: 0,
        status: 0,
        video: ''
      },
      rules: {
        id: [],
        title: [{ required: true, message: '请填写直播主题' }],
        cover: [{ required: true, message: '请填写直播封面' }],
        auther: [],
        address: [],
        introduction: [],
        replay: [{ required: true, message: '请选择是否会看' }],
        status: [{ required: true, message: '请选择状态' }],
        video: []
      },
      imageUploadUrl: process.env.VUE_APP_BASE_API + '/api/upload/uploadImage',
      imageVideo: process.env.VUE_APP_BASE_API + '/api/upload/uploadVideo',
      fileList: [],
      dataList: [],
      baseUrl: process.env.VUE_APP_BASE_API,
      streamInfo: {
        videoStreamName: '', // 视频流名称
        stramId: '', // 流id
        fileAddress: '', // 直播数据主键
        pushStramAddress: '', // 推流地址
        m3u8PullAddress: '', // m3u8拉流地址
        rtmpPullAddress: '', // rtmp拉流地址
        m3u8Address: '', // m3u8文件下载地址
        mp4Address: '', // mp4下载地址
        pullStreamAddress: '', // 未拼接过的流名称
        replay: 0 // 是否允许回看
      },
      streamDialogVisible: false,
      fileList2: []
    }
  },
  methods: {
    // 编辑
    handleClickEdit(data) {
      const { id, title, cover, auther, address, introduction, replay, status, video } = data
      if (cover) {
        this.fileList = [{ url: process.env.VUE_APP_BASE_API + cover, name: cover }]
      }
      if (video) {
        this.fileList2 = [{ url: process.env.VUE_APP_BASE_API + video, name: video }]
      }
      this.form.id = id
      this.form.title = title
      this.form.cover = cover
      this.form.auther = auther
      this.form.address = address
      this.form.introduction = introduction
      this.form.replay = replay
      this.form.status = status
      this.form.video = video
      this.dialogVisible = true
    },

    /** 获取直播流信息 */
    async getLiveStream(id) {
      const result = await getLiveStream(id)
      const { videoStreamName, stramId, fileAddress, pushStramAddress, m3u8PullAddress, rtmpPullAddress, m3u8Address, mp4Address, pullStreamAddress, replay } = result.data
      this.streamInfo = {
        videoStreamName,
        stramId,
        fileAddress,
        pushStramAddress,
        m3u8PullAddress,
        rtmpPullAddress,
        m3u8Address,
        mp4Address,
        pullStreamAddress,
        replay
      }
      this.streamDialogVisible = true
    },
    /** 修改状态 */
    async handleClickStatus(data) {
      const { id, title, cover, auther, address, introduction, replay, video } = data
      let { status } = data
      if (status === 0) {
        status = 2
      } else {
        status = 0
      }
      const result = await liveUpdate({ id, title, cover, auther, address, introduction, replay, status, video })
      this.$message.success(result.msg || '修改成功')
      this.$refs.table.getData()
    },
    // 删除
    async handleClickDelete(id) {
      this._globalLoading('正在进行删除操作')
      const result = await liveDelete(id)
      this.$message.success(result.msg || '删除成功')
      this.$refs.table.getData()
    },
    // 获取数据
    handlerList(value) {
      this.dataList = value
    },
    getData() {
      return liveList
    },
    // 重置表单
    hanldeReset(done) {
      this.form.id = ''
      this.form.title = ''
      this.form.cover = ''
      this.form.auther = ''
      this.form.address = ''
      this.form.introduction = ''
      this.form.replay = 0
      this.form.status = 0
      this.form.video = ''
      this.fileList = []
      this.fileList2 = []
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
          request = liveUpdate
          data = Object.assign(this.form, {})
        } else {
          request = liveAdd
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
