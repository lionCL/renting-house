import React, { Component } from 'react'
import { Toast } from 'antd-mobile'

//导入api
import { getCurrentCity } from '@/utils/city'
import { getAreaHouse, getHouseList } from '@/api/'

//导入子组件
import NavHeader from '@/components/NavHeader'
import HouseItem from '@/components/HouseItem'

//导入样式
import styles from './index.module.scss'

//取出BMap
const BMap = window.BMap
//文字覆盖物样式
const labelStyle = {
  //注意驼峰命名
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}

export default class Map extends Component {
  state = {
    // 是否显示房源列表
    isShowHouseList: false,
    houseList: [] // 房源列表
  }

  componentDidMount() {
    this.initMap() //加载地图
  }

  componentWillUnmount() {
    //清除事件
    this.map.removeEventListener('touchmove', () => {})
  }

  //初始化创建地图
  initMap = async () => {
    //获取当前定位城市
    const { label, value } = await getCurrentCity()
    //创建地图实例
    var map = new BMap.Map('container')
    //添加到组件实例
    this.map = map

    //触摸事件移动关闭房源列表以及情况列表
    this.map.addEventListener('touchmove', () => {
      //
      this.setState({
        isShowHouseList: false,
        houseList: []
      })
    })

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

          //开始渲染第一级覆盖物
          this.renderOverlays(value)
        }
      },
      label
    )
  }

  // 获取当前的地图级别，然后决定渲染什么类型的覆盖物（圆形和方形）
  // 并且还需要知道点击当前覆盖物之后，下一个级别的地图级别是多少
  getTypeAndNextZoom = () => {
    let type, nextZoom
    const zoom = this.map.getZoom()
    // 判断
    if ((zoom > 10) & (zoom < 12)) {
      //zoom为11  渲染第一级覆盖物 圆形
      type = 'circle'
      nextZoom = 13
    } else if ((zoom > 12) & (zoom < 14)) {
      //zoom为13  渲染第二级覆盖物 圆形
      type = 'circle'
      nextZoom = 15
    } else {
      // 渲染第三级覆盖物  方形
      type = 'rectangle'
    }
    //返回参数
    return {
      type,
      nextZoom
    }
  }

  //渲染覆盖物的函数
  renderOverlays = async id => {
    Toast.loading('数据加载中...', 0)
    const res = await getAreaHouse(id)
    // console.log(res)

    // 根据type和zoom 来渲染覆盖物的样子
    const { type, nextZoom } = this.getTypeAndNextZoom()
    //遍历结果
    res.body.forEach(item => {
      if (type === 'circle') {
        this.creatCircleOverlays(item, nextZoom)
      } else {
        //第三次的覆盖物渲染
        this.creatRectangleOverlays(item)
      }
    })
    Toast.hide()
  }

  //type为circle的渲染方法 第一次/第一次
  creatCircleOverlays = (item, nextZoom) => {
    //解构
    const {
      //给label取别名name
      label: name,
      value: id,
      count,
      coord: { latitude, longitude }
    } = item
    //创建覆盖物
    var point = new BMap.Point(longitude, latitude)
    //创建选项
    let opts = {
      position: point, //指定文本标注所在的地理位置
      offset: new BMap.Size(30, -30) //设置文本偏移量
    }
    //创建文本标注对象
    let label = new BMap.Label('', opts)
    //设置label的样式
    label.setStyle(labelStyle)
    //设置内容
    label.setContent(`<div class=${styles.bubble}>
      <p class=${styles.name}>${name}</p>
      <p class=${styles.name}>${count}套</p>
    </div>`)

    //添加事件
    label.addEventListener('click', () => {
      //清除所有的覆盖物  定时器0 如有队列立即插入队列
      setTimeout(() => {
        this.map.clearOverlays()
      }, 0)

      //重置中心点和地图级别
      this.map.centerAndZoom(point, nextZoom)

      //加载下一级覆盖物,并且渲染
      this.renderOverlays(id)
    })

    //添加到地图上
    this.map.addOverlay(label)
  }

  //tyep为rectangle的这盖屋渲染
  creatRectangleOverlays = item => {
    //解构
    const {
      //给label取别名name
      label: name,
      value: id,
      count,
      coord: { latitude, longitude }
    } = item

    //创建覆盖物
    let point = new BMap.Point(longitude, latitude)
    //创建选项
    let opts = {
      position: point, //指定文本标注所在的地理位置
      offset: new BMap.Size(50, -20) //设置文本偏移量
    }
    //创建文本标注对象
    let label = new BMap.Label('', opts)
    //设置label的样式
    label.setStyle(labelStyle)

    //设置内容
    label.setContent(`<div class=${styles.rect}>
    <span class=${styles.housename}>${name}</span>
    <span class=${styles.housenum}>${count}套</span>
    <i class='iconfont icon-arrow ${styles.arrow}'/>
<div>`)

    //监听点击事件
    label.addEventListener('click', e => {
      if (!e || !e.changedTouches) return //如果没有点击对象直接返回
      //获取点击的鼠标的clienX clientY值
      const { clientX, clientY } = e.changedTouches[0]
      //点击移动到可视区域中间位置 计算吃距离
      const moveX = window.innerWidth / 2 - clientX
      const moveY = (window.innerHeight - 330 + 45) / 2 - clientY

      //在地图上平移X和Y像素
      this.map.panBy(moveX, moveY)
      //发送请求 获取房源列表
      this.getHouseListById(id)
      // // 显示房源列表面板
      // this.setState({
      //   isShowHouseList: true
      // })
    })
    //添加到地图上
    this.map.addOverlay(label)
  }

  //获取房源列表
  getHouseListById = async id => {
    Toast.loading('数据加载中...', 0)
    const res = await getHouseList({ cityId: id })
    console.log(res)
    Toast.hide()

    this.setState({
      houseList: res.body.list,
      isShowHouseList: true
    })
  }

  //渲染房屋列表
  renderHouseList = () => {
    const { isShowHouseList, houseList } = this.state
    return (
      <div
        className={[styles.houseList, isShowHouseList ? styles.show : ''].join(
          ' '
        )}
      >
        <div className={styles.titleWrap}>
          <div className={styles.listTitle}>房屋列表</div>
          <div className={styles.titleMore}>更多房源</div>
        </div>
        <div className={styles.houseItems}>
          {houseList.map(item => {
            return <HouseItem key={item.houseCode} {...item}></HouseItem>
          })}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.map}>
        {/* 渲染导航 */}
        <NavHeader>地图找房</NavHeader>
        {/* 显示地图  高度一定要100%*/}
        <div id="container"></div>
        {/* 渲染房源列表 */}
        {this.renderHouseList()}
      </div>
    )
  }
}
