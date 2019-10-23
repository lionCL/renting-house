import axios from 'axios'

//导入地址
import { BASE_URL } from './url.js'
import { getToken, removeToken } from '@/utils/token'

//创建一个请求实例
const instance = axios.create({
  baseURL: BASE_URL
})

//响应拦截
instance.interceptors.response.use(
  response => {
    if (response.data.status === 400) {
      removeToken()
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

//请求拦截
instance.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      //给请求头添加token
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default instance
