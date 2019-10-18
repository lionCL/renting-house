import React, { Component } from 'react'

//导入api
import { getCurrentCity } from '@/utils/city'

//导入子组件
import NavHeader from '@/components/NavHeader'

//导入样式
import styles from './index.module.scss'

//取出BMap
const BMap = window.BMap

export default class Map extends Component {
  componentDidMount() {
    this.initMap() //加载地图
  }

  //初始化创建地图
  initMap = async () => {
    //获取当前定位城市
    const { label, value } = await getCurrentCity()

    //创建地图实例
    const map = new BMap.Map('container')
    //添加到组件实例
    this.map = map
    //创建一个地址解析器实例
    const myGeocoder = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeocoder.getPoint(
      label,
      point => {
        if (point) {
          // 显示出来（必须要有中心点和缩放级别）
          map.centerAndZoom(point, 11)
          // 添加一个覆盖物
          // map.addOverlay(new BMap.Marker(point))

          //添加控件(可选)
          map.addControl(new BMap.NavigationControl())
          map.addControl(new BMap.ScaleControl())
        }
      },
      label
    )
  }

  render() {
    return (
      <div className={styles.map}>
        {/* 渲染导航 */}
        <NavHeader>地图找房</NavHeader>
        {/* 显示地图  高度一定要100%*/}
        <div id="container"></div>
      </div>
    )
  }
}
