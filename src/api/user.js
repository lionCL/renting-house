//关于用户的请求api
import request from '@/utils/axios.js'

//用户登录
export const userLogin = ({ username, password }) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
