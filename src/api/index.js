// 请求模块
import request from '@/utils/axios.js'

//获取轮播
function getCarousel() {
  return request({
    url: '/home/swiper',
    method: 'get'
  })
}

export { getCarousel }
