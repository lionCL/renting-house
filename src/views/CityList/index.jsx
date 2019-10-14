import React, { Component } from 'react'

//导入子组件
import NavHeader from '@/components/NavHeader'

//导入api
import { getCityList, getHotCity } from '@/api'

export default class CityList extends Component {
  constructor() {
    super()
    this.state = {
      cityListObj: {}, //  左边城市数据
      cityIndex: [] //右边城市首字母索引
    }
  }
  componentDidMount() {
    this.getCityListData()
  }

  //获取城市列表信息 并对数据进行处理
  async getCityListData() {
    let res = await getCityList(1)
    // console.log(res)
    // 1、遍历城市列表数组
    const cityListObj = {}
    if (res.status === 200) {
      res.body.forEach(item => {
        const letter = item.short.substr(0, 1)
        if (cityListObj[letter]) {
          cityListObj[letter].push(item)
        } else {
          cityListObj[letter] = [item]
        }
      })
      // 2、根据 cityListObj 生成 索引数组 并排序 Es6 对象新方法 Object.keys()
      const cityIndex = Object.keys(cityListObj).sort()
      // 3、获取并处理热门城市数据
      let hotCity = await getHotCity()
      cityIndex.unshift('hot')
      cityListObj['hot'] = hotCity.body

      //赋值给模型
      this.setState({
        cityListObj,
        cityIndex
      })
    }
  }

  render() {
    return (
      <div>
        {/* 渲染头部导航   标签里面的内容就是children */}
        <NavHeader>城市列表</NavHeader>
      </div>
    )
  }
}
