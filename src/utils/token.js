//关于本地存储的操作逻辑

//设置当前定位城市key值
const CITY_KEY = 'hkzf_key'

//存储当前用户token
const CITY_TOKEN = 'hkzf_token'

//当前定位城市保存到本地
export const setCity = city => {
  window.localStorage.setItem(CITY_KEY, JSON.stringify(city))
}
//取出本地保存的当前定位城市信息
export const getCity = () => {
  return JSON.parse(window.localStorage.getItem(CITY_KEY))
}

//保存token
export const setToken = token => {
  window.localStorage.setItem(CITY_TOKEN, token)
}
//获取本地token
export const getToken = () => {
  return window.localStorage.getItem(CITY_TOKEN)
}
//删除本地用户token
export const removeToken = () => {
  window.localStorage.removeItem(CITY_TOKEN)
}

//判断用户是否登录
export const isAuth = () => {
  // console.log(getToken())

  return getToken()
}
