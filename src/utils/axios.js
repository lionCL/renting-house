import axios from 'axios'

//导入地址
import { BASE_URL } from './url.js'

//创建一个请求实例
const instance = axios.create({
  baseURL: BASE_URL
})

export default instance
