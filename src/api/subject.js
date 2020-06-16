import request from '@/utils/request'
import qs from 'qs'

const SUBJECTADD = '/api/paperquestion/add'
const SUBJECTRDELETE = '/api/paperquestion/deleteById'
const SUBJECTLIST = '/api/paperquestion/listByPage'
const SUBJECTUPDATE = '/api/paperquestion/update'
const SUBJECTIMPORT = '/api/paperquestion/import'

/**
 *
 * @description 新增题目
 * @export
 * @param {*} data
 * @returns
 */
export function subjectAdd(data) {
  return request({
    url: SUBJECTADD,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 更新题目
 * @export
 * @param {*} data
 * @returns
 */
export function subjectUpdate(data) {
  return request({
    url: SUBJECTUPDATE,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 题目列表
 * @export
 * @param {*} pageSize
 * @param {*} pageNumber
 * @returns
 */
export function subjectList(pageSize, pageNumber, paperId) {
  return request({
    url: SUBJECTLIST,
    method: 'GET',
    params: {
      pageSize,
      pageNumber,
      paperId
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
export function subjectDelete(id) {
  return request({
    url: SUBJECTRDELETE,
    method: 'POST',
    data: qs.stringify({ id })
  })
}

/**
 *
 * @description 导入题目
 * @export
 * @param {*} paperId
 * @param {*} formData
 * @returns
 */
export function subjectImport(formData) {
  return request({
    url: SUBJECTIMPORT,
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
