import React, { Component } from 'react'
import { Flex } from 'antd-mobile'

//api
import { getCurrentCity } from '@/utils/city'

//导入通用searchBar
import SearchHeader from '@/components/SearchHeader'
//样式
import styles from './index.module.scss'
//导入筛选子组件
import Filter from '@/views/HouseList/components/Filter'

export class HouseList extends Component {
  constructor() {
    super()
    this.state = {
      cityName: ''
    }
  }

  async componentWillMount() {
    const { label } = await getCurrentCity()
    this.setState({
      cityName: label
    })
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 顶部搜索栏 */}
        <Flex className={styles.listHeader}>
          <i
            className="iconfont icon-back"
            onClick={() => {
              this.props.history.go(-1)
            }}
          ></i>
          <SearchHeader
            cityName={this.state.cityName}
            className={styles.listSearch}
          />
        </Flex>
        {/* 搜索条 */}
        <Filter />
      </div>
    )
  }
}

export default HouseList
