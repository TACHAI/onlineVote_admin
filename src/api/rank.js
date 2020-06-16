import request from '@/utils/request'

const RANKLIST = '/api/papermark/listByPage'

/**
 *
 * @description 排行
 * @export
 * @param {*} paperId
 * @param {*} pageSize
 * @param {*} pageNumber
 * @returns
 */
export function rank(pageSize, pageNumber, paperId) {
  return request({
    url: RANKLIST,
    method: 'GET',
    params: { paperId, pageSize, pageNumber }
  })
}
