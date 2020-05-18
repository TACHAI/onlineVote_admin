import request from '@/utils/request'
import qs from 'qs'

const ACTIVEADD = '/api/activity/add'
const ACTIVEUPDATE = '/api/activity/update'
const ACTIVELIST = '/api/activity/listVOByPage'
const ACTIVESTATUS = '/api/activity/status'
const ACTIVEDELETE = '/api/activity/deleteById'

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
    method: 'POST',
    data: qs.stringify({ id })
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
