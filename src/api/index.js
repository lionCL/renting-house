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

//根据城市名称查询该城市信息
function getCityInfo(cityName) {
  return request({
    url: `/area/info?name=${cityName}`,
    method: 'get'
  })
}

//根据区域id，查询该区域的房源数据
function getAreaHouse(id) {
  return request({
    url: `/area/map?id=${id}`,
    method: 'get'
  })
}

//根据条件查询房屋所需要的各种数据
function getHouseList(query) {
  const {
    cityId,
    area,
    subway,
    rentType,
    price,
    more,
    roomType,
    oriented,
    characteristic,
    floor,
    start,
    end
  } = query
  return request({
    url: `/houses`,
    method: 'get',
    params: {
      cityId,
      area,
      subway,
      rentType,
      price,
      more,
      roomType,
      oriented,
      characteristic,
      floor,
      start,
      end
    }
  })
}

//房屋查询筛选条件
function FilterList(value) {
  return request({
    url: `/houses/condition?id=${value}`,
    method: 'get'
  })
}

///houses/{id}  查询房屋具体信息
function getHouseInfo(id) {
  return request({
    url: `/houses/${id}`,
    method: 'get'
  })
}

export {
  getCarousel,
  getGroups,
  getNews,
  getCityList,
  getHotCity,
  getCityInfo,
  getAreaHouse,
  getHouseList,
  FilterList,
  getHouseInfo
}
