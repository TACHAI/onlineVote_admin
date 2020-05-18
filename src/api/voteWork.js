import request from '@/utils/request'
import qs from 'qs'

const VOTEWORKADD = '/api/votework/add'
const VOTEWORKUPDATE = '/api/votework/update'
const VOTEWORKLIST = '/api/votework/listByPage'

export function voteWorkAdd(data) {
  return request({
    url: VOTEWORKADD,
    method: 'POST',
    data: qs.stringify(data)
  })
}

export function voteWorkUpdate(data) {
  return request({
    url: VOTEWORKUPDATE,
    method: 'POST',
    data: qs.stringify(data)
  })
}

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
