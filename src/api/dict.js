import request from "@/utils/request"
import qs from 'qs'

const DICTLIST = '/api/back/dict/listByPage'
const DICTADD = '/api/back/dict/add'
const DICTDELETE = '/api/back/dict/deleteById'
const DICTEDIT = '/api/back/dict/update'
const DICTBYID = '/api/back/dict/selectById'


export function dictList(pageSize,pageNumber) {
return request({
  url: DICTLIST,
  method: 'GET',
  params: {
    pageSize,
    pageNumber
  }
})
}

export function dictAdd(data) {
  return request({
    url: DICTADD,
    method: 'POST',
    data: qs.stringify(data)
  })
}

export function dictDelete(id) {
return request({
  url: DICTDELETE,
  method: 'GET',
  params: {
    id
  }
})
}

export function dictEdit(data) {
  return request({
    url: DICTEDIT,
    method: 'POST',
    data: qs.stringify(data)
  })
}

export function selectById(id) {
    return request({
      url: DICTBYID,
      method: 'GET',
      params: {
        id
      }
    })
}
