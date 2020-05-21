import request from '@/utils/request'
import qs from 'qs'

const ANSWERADD = '/api/paperanswer/add'
const ANSWERRDELETE = '/api/paperanswer/deleteById'
const ANSWERLIST = '/api/paperanswer/list'
const ANSWERUPDATE = '/api/paperanswer/update'

/**
 *
 * @description 新增答案
 * @export
 * @param {*} data
 * @returns
 */
export function answerAdd(data) {
  return request({
    url: ANSWERADD,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 更新答案
 * @export
 * @param {*} data
 * @returns
 */
export function answerUpdate(data) {
  return request({
    url: ANSWERUPDATE,
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 *
 * @description 答案列表
 * @export
 * @param {*} paperId
 * @returns
 */
export function answerList(questionId) {
  return request({
    url: ANSWERLIST,
    method: 'GET',
    params: {
      questionId
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
export function answerDelete(id) {
  return request({
    url: ANSWERRDELETE,
    method: 'POST',
    data: qs.stringify({ id })
  })
}
