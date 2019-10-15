//关于本地存储的操作逻辑

//设置当前定位城市key值
const CITY_KEY = 'hkzf_key'

//当前定位城市保存到本地
export const setCity = city => {
  window.localStorage.setItem(CITY_KEY, JSON.stringify(city))
}
//取出本地保存的当前定位城市信息
export const getCity = () => {
  return JSON.parse(window.localStorage.getItem(CITY_KEY))
}