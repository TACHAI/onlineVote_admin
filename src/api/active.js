import request from '@/utils/request'
import qs from 'qs'

const ACTIVEADD = '/api/activity/add'
const ACTIVEUPDATE = '/api/activity/update'
const ACTIVELIST = '/api/activity/listVOByPage'
const ACTIVESTATUS = '/api/activity/status'
const ACTIVEDELETE = '/api/activity/deleteById'
const ACTIVEUSERADD = '/api/activityuser/add'
const ACTIVEUSERLIST = '/api/activityuser/listByPage'
const ACTIVESELECTBYID = '/api/activity/selectById  '
const ACTIVEEXPORT = '/api/activityuser/exportExcelUser'

/**
 *
 * @description 新增活动
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
 * @description 更新活动
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
 * @description 删除活动
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
 * @description 活动上架下架
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
    method: 'POST',
    data: qs.stringify({ id })
  })
}

/**
 *
 * @description 导出名单
 * @export
 * @param {*} activityId
 * @returns
 */
export function exportUser(activityId) {
  return request({
    url: ACTIVEEXPORT,
    method: 'POST',
    data: qs.stringify({ activityId })
  })
}
