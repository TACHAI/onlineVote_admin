import request from '@/utils/request'
import qs from 'qs'

const VOTEADD = '/api/vote/add'
const VOTEUPDATE = '/api/vote/update'
const VOTEDELETE = '/api/vote/deleteById'
const VOTELIST = '/api/vote/listByPage'

export function voteAdd(data) {
  return request({
    url: VOTEADD,
    method: 'POST',
    data: qs.stringify(data)
  })
}

export function voteUpdate(data) {
  return request({
    url: VOTEUPDATE,
    method: 'POST',
    data: qs.stringify(data)
  })
}

export function voteDelete(id) {
  return request({
    url: VOTEDELETE,
    method: 'POST',
    data: qs.stringify({
      id
    })
  })
}

export function voteList(pageSize, pageNumber) {
  return request({
    url: VOTELIST,
    method: 'GET',
    params: {
      pageSize,
      pageNumber
    }
  })
}
