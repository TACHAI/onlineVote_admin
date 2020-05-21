import request from '@/utils/request'
import qs from 'qs'

const LIVEADD = '/api/live/add'
const LIVELIST = '/api/live/listByPage'
const LIVESELECTBYID = '/api/live/selectById'
const LIVEUPDATE = '/api/live/update'
const LIVEDELETE = '/api/live/delete'

/**
 *
 * @description 新增直播
 * @export
 * @param {*} data
 * @returns
 */
export function liveAdd(data) {
  return request({
    url: LIVEADD,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 更新直播
 * @export
 * @param {*} data
 * @returns
 */
export function liveUpdate(data) {
  return request({
    url: LIVEUPDATE,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 直播列表
 * @export
 * @param {*} pageSize
 * @param {*} pageNumber
 * @param {*} liveName
 * @param {*} userId
 * @returns
 */
export function liveList(pageSize, pageNumber, liveName, userId) {
  return request({
    url: LIVELIST,
    method: 'GET',
    params: {
      pageSize,
      pageNumber,
      liveName,
      userId
    }
  })
}

/**
 *
 * @description 获取直播信息
 * @export
 * @param {*} id
 * @returns
 */
export function liveSelectById(id) {
  return request({
    url: LIVESELECTBYID,
    method: 'GET',
    params: {
      id
    }
  })
}

export function liveDelete(id) {
  return request({
    url: LIVEDELETE,
    method: 'POST',
    data: qs.stringify({ id })
  })
}
