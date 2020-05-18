import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = store.getters.token || getToken()
    if (token) {
      config.headers['Authorization'] = store.getters.token || getToken()
    }

    if (config.method.toLocaleLowerCase() === 'get') {
      config.params.date = new Date().getTime()
    }

    return config
  },
  error => {
    console.log(error) // for debug
    if (store.getters.loading) {
      store.getters.loading.close()
      store.dispatch('utils/setLoading', null)
    }
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (store.getters.loading) {
      store.getters.loading.close()
      store.dispatch('utils/setLoading', null)
    }
    if (response.config.method.toLocaleLowerCase() === 'get') {
      return res
    }

    if (res.status !== 200) {
      Message({
        message: res.msg || '请求失败',
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(res)
    }

    return res
  },
  error => {
    console.dir(error)
    Message({
      message: error.msg || '服务器出错',
      type: 'error',
      duration: 2 * 1000
    })
    if (store.getters.loading) {
      store.getters.loading.close()
      store.dispatch('utils/setLoading', null)
    }
    return Promise.reject(error)
  }
)

export default service
