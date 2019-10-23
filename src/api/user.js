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

//获取用户的信息资料
export const getUserInfo = () => {
  return request({
    url: '/user',
    method: 'get'
  })
}

//查看已发布房源列表
export const getRentedHouse = () => {
  return request({
    url: 'user/houses',
    method: 'get'
  })
}
