import React, { Component } from 'react'

import { Toast } from 'antd-mobile'

//导入子组件
import NavHeader from '@/components/NavHeader'
import HouseItem from '@/components/HouseItem'
import styles from './index.module.scss'

//API
import { getRentedHouse } from '@/api/user'

export default class Rent extends Component {
  constructor() {
    super()
    this.state = {
      list: [] //我的房屋出租列表
    }
  }

  componentDidMount() {
    this.getRentedHouseData()
  }

  async getRentedHouseData() {
    Toast.loading('数据加载中...', 0)
    let res = await getRentedHouse()
    Toast.hide()
    // console.log(res)
    const { status, body } = res
    if (status === 200) {
      this.setState({
        list: body
      })
    } else {
      //token失效
      const { history, location } = this.props

      history.replace('/login', { form: location })
    }
  }

  //渲染出租房屋列表
  renderRentList = () => {
    const { list } = this.state
    const { history } = this.props
    const hasHouses = list.length > 0
    if (!hasHouses) {
    } else {
      return (
        <div className={styles.houses}>
          {list.map(item => {
            return (
              <HouseItem
                key={item.houseCode}
                {...item}
                onClick={() => {
                  history.push(`/detail/${item.houseCode}`)
                }}
              />
            )
          })}
        </div>
      )
    }
  }

  render() {
    const { list } = this.state
    return (
      <div className={styles}>
        {/* 头部 */}
        <NavHeader className={styles.rentHeader}>我的出租列表</NavHeader>
        {list.length > 0 && this.renderRentList()}
      </div>
    )
  }
}
