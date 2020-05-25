// import Cookies from 'js-cookie'
import store from 'store'

const TokenKey = 'Admin-Token'
const AdminName = 'Admin-Name'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

export function getToken() {
  return store.get(TokenKey)
}

export function setToken(token) {
  console.log(token)
  store.set(TokenKey, token)
}

export function removeToken() {
  store.remove(TokenKey)
}

export function getAdminName() {
  return store.get(AdminName)
}

export function setAdminName(name) {
  store.set(AdminName, name)
}

export function removeAdminName() {
  store.remove(AdminName)
}
