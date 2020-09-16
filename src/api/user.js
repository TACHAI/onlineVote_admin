import request from '@/utils/request'
import qs from 'qs'

const USERLOGIN = '/api/back/user/login'
const USERUPDATEPASSWORD = '/api/back/user/updatePassword'
const USEREXIT = '/api/back/user/exit'

/**
 * @description 登录
 * @param {*} username
 * @param {*} password
 */
export function login(username, password) {
  return request({
    url: USERLOGIN,
    method: 'POST',
    data: qs.stringify({
      username,
      password
    })
  })
}

/**
 * @description 更新密码
 * @param {*} username
 * @param {*} passwordOld
 * @param {*} passwordNew
 */
export function updatePassword(username, passwordOld, passwordNew) {
  return request({
    url: USERUPDATEPASSWORD,
    method: 'POST',
    data: qs.stringify({
      username,
      passwordOld,
      passwordNew
    })
  })
}

/**
 * @description 退出
 */
export function logout() {
  return request({
    url: USEREXIT,
    method: 'POST'
  })
}
