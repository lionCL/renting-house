//关于获取当前的城市的

//导入本地操作
import { setCity, getCity } from '@/utils/token.js'
//导入API
import { getCityInfo } from '@/api'

const BMap = window.BMap

export function getCurrentCity() {
  const city = getCity()
  if (!city) {
    //本地没有城市信息,用百度地址获取当前城市
    return new Promise((resolve, reject) => {
      let myCity = new BMap.LocalCity()
      myCity.get(async result => {
        //城市名 result.name
        try {
          let res = await getCityInfo(result.name)
          // console.log(res)
          const resData = res.body
          //将对象resolve出去
          resolve(resData)
          //保存到本地
          const { label, value } = resData
          setCity({ label, value })
        } catch (error) {
          reject(error)
        }
      })
    })
  } else {
    //确定成功情况下  Promise.resolve() 直接返回成功  相当于 new Promise()
    return Promise.resolve(city)
  }
}
