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

//收藏功能
export const doFavorite = (id, type) => {
  return request({
    url: `/user/favorites/${id}`,
    method: `${type}` //  get  post添加  delete 删除
  })
}

//房源图片上传
export const uploadHouseImg = fd => {
  return request({
    url: '/houses/image',
    method: 'post',
    data: fd,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

//发布房源
export const publishHouse = data => {
  return request({
    url: '/user/houses',
    method: 'post',
    data
  })
}
