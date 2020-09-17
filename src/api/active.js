import request from '@/utils/request'
import qs from 'qs'

const ACTIVEADD = '/api/back/activity/add'
const ACTIVEUPDATE = '/api/back/activity/update'
const ACTIVELIST = '/api/back/activity/listByPage'
const ACTIVESTATUS = '/api/back/activity/status'
const ACTIVEDELETE = '/api/back/activity/deleteById'
const ACTIVEUSERADD = '/api/back/activity/add'
const ACTIVEUSERLIST = '/api/back/activity/listByPage'
const ACTIVESELECTBYID = '/api/back/activity/selectById'
// const ACTIVEEXPORT = '/api/activityuser/exportExcelUser'

/**
 *
 * @description 新增投票活动
 * @export
 * @param {*} data
 * @returns
 */
export function activeAdd(data) {
  return request({
    url: ACTIVEADD,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 更新投票活动
 * @export
 * @param {*} data
 * @returns
 */
export function activeUpdate(data) {
  return request({
    url: ACTIVEUPDATE,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 删除投票活动
 * @export
 * @param {*} id
 * @returns
 */
export function activeDelete(id) {
  return request({
    url: ACTIVEDELETE,
    method: 'POST',
    data: qs.stringify({ id })
  })
}

/**
 *
 * @description 投票活动上架下架
 * @export
 * @param {*} id
 * @returns
 */
export function activeStatus(id) {
  return request({
    url: ACTIVESTATUS,
    method: 'GET',
    params: {
      id
    }
  })
}

/**
 *
 * @description 获取数据
 * @export
 * @param {*} pageSize
 * @param {*} pageNumber
 * @returns
 */
export function activeList(pageSize, pageNumber) {
  return request({
    url: ACTIVELIST,
    method: 'GET',
    params: {
      pageSize,
      pageNumber
    }
  })
}

/**
 *
 * @description 新增用户报名
 * @export
 * @param {*} data
 * @returns
 */
export function activeUserAdd(data) {
  return request({
    url: ACTIVEUSERADD,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 获取报名用户详情数据
 * @export
 * @param {*} pageSize
 * @param {*} pageNumber
 * @param {*} activityId
 * @returns
 */
export function activeUserList(pageSize, pageNumber, activityId) {
  return request({
    url: ACTIVEUSERLIST,
    method: 'GET',
    params: {
      pageSize,
      pageNumber,
      activityId
    }
  })
}

/**
 *
 * @description 根据id获取活动详情
 * @export
 * @param {*} id
 * @returns
 */
export function activeSelectById(id) {
  return request({
    url: ACTIVESELECTBYID,
    method: 'GET',
    params:{
      id
    }
  })
}

/**
 *
 * @description 导出名单
 * @export
 * @param {*} activityId
 * @returns
 */
// export function exportUser(activityId) {
//   return request({
//     url: ACTIVEEXPORT,
//     method: 'GET',
//     params: { activityId }
//   })
// }
