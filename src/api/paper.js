import request from '@/utils/request'
import qs from 'qs'

const PAPERADD = '/api/paper/add'
const PAPAERDELETE = '/api/paper/deleteById'
const PAPERLIST = '/api/paper/listByPage'
const PAPERUPDATE = '/api/paper/update'

/**
 *
 * @description 新增试卷
 * @export
 * @param {*} data
 * @returns
 */
export function paperAdd(data) {
  return request({
    url: PAPERADD,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 更新试卷
 * @export
 * @param {*} data
 * @returns
 */
export function paperUpdate(data) {
  return request({
    url: PAPERUPDATE,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 试卷列表
 * @export
 * @param {*} pageSize
 * @param {*} pageNumber
 * @returns
 */
export function paperList(pageSize, pageNumber) {
  return request({
    url: PAPERLIST,
    method: 'GET',
    params: {
      pageSize,
      pageNumber
    }
  })
}

/**
 *
 * @description 删除
 * @export
 * @param {*} id
 * @returns
 */
export function paperDelete(id) {
  return request({
    url: PAPAERDELETE,
    method: 'POST',
    data: qs.stringify({ id })
  })
}
