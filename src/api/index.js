// 请求模块
import request from '@/utils/axios.js'

//首页获取轮播图
function getCarousel() {
  return request({
    url: '/home/swiper',
    method: 'get'
  })
}

//租房小组信息
function getGroups(areaId) {
  return request({
    url: `/home/groups?area=${areaId}`,
    method: 'get'
  })
}

//最新资讯
function getNews(areaId) {
  return request({
    url: `/home/news?area=${areaId}`,
    method: 'get'
  })
}

//获取城市列表信息   1/2
function getCityList(num) {
  return request({
    url: `/area/city?level=${num}`,
    method: 'get'
  })
}

//获取热门城市
function getHotCity() {
  return request({
    url: `/area/hot`,
    method: 'get'
  })
}

export { getCarousel, getGroups, getNews, getCityList, getHotCity }
