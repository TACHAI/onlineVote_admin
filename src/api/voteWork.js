import request from '@/utils/request'
import qs from 'qs'

const VOTEWORKADD = '/api/votework/add'
const VOTEWORKUPDATE = '/api/votework/update'
const VOTEWORKLIST = '/api/votework/listByPage'
const VOTEWORKSELECTBYID = '/api/votework/selectById'

/**
 *
 * @description 新增作品
 * @export
 * @param {*} data
 * @returns
 */
export function voteWorkAdd(data) {
  return request({
    url: VOTEWORKADD,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 更新作品
 * @export
 * @param {*} data
 * @returns
 */
export function voteWorkUpdate(data) {
  return request({
    url: VOTEWORKUPDATE,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 获取作品列表
 * @export
 * @param {*} pageSize
 * @param {*} pageNumber
 * @param {*} voteId
 * @returns
 */
export function voteWorkList(pageSize, pageNumber, voteId) {
  return request({
    url: VOTEWORKLIST,
    method: 'GET',
    params: {
      pageSize,
      pageNumber,
      voteId
    }
  })
}

/**
 *
 * @description 根据id获取作品内容
 * @export
 * @param {*} id
 * @returns
 */
export function voteWorkSelectById(id) {
  return request({
    url: VOTEWORKSELECTBYID,
    method: 'POST',
    data: qs.stringify({ id })
  })
}
