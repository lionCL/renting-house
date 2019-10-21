import React, { Component } from 'react'
import { Flex, Toast } from 'antd-mobile'

//api
import { getCurrentCity } from '@/utils/city'
import { getHouseList } from '@/api'

//长列表
import {
  AutoSizer,
  List,
  WindowScroller,
  InfiniteLoader
} from 'react-virtualized'

//导入通用searchBar
import SearchHeader from '@/components/SearchHeader'
import HouseItem from '@/components/HouseItem'
// import NoHouse from '@/components/NoHouse'
import Sticky from '@/components/Sticky'
//样式
import styles from './index.module.scss'
//导入筛选子组件
import Filter from '@/views/HouseList/components/Filter'

export class HouseList extends Component {
  constructor() {
    super()
    this.state = {
      cityName: '', //城市名称
      houseList: null, //房源列表
      count: 0 //房源总条数
    }
  }

  //删选条件的对象
  filter = {}

  async componentWillMount() {
    const { label, value } = await getCurrentCity()

    //将当前城市信息赋值给实例
    this.value = value

    this.setState({
      cityName: label
    })

    //页面加载完毕时 获取默认第一页的房源列表(1-20)
    this.getHouseListData()
  }

  //接受Filter子组件传递过来的删选条件对象
  onFilter = filter => {
    this.filter = filter

    this.getHouseListData()
  }

  //获取房源列表数据
  getHouseListData = async () => {
    Toast.loading('数据加载中...', 0)
    const res = await getHouseList({
      cityId: this.value,
      start: 1,
      end: 20,
      //展开搜寻条件
      ...this.filter
    })

    Toast.hide()
    const { count, list } = res.body
    if (count > 0) {
      Toast.info(`共查询到${count}套房源信息`, 1)
    }
    //存储到state
    this.setState({
      count,
      houseList: list
    })
  }

  //渲染行
  rowRenderer = ({ key, index, style }) => {
    const { houseList } = this.state
    const item = houseList[index]

    if (!item) {
      //如果行没有数据时候渲染占位内容
      return (
        <div key={key} style={style}>
          <p className={styles.loading}></p>
        </div>
      )
    }

    return (
      <div key={key} style={style}>
        <HouseItem {...item} />
      </div>
    )
  }

  //判断某一行是否加载完毕
  isRowLoaded = ({ index }) => {
    return !!this.state.houseList[index]
  }

  //加载更多  需要返回一个promise对象
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise(async (resolve, reject) => {
      Toast.loading('数据加载中...', 0)
      const res = await getHouseList({
        cityId: this.value,
        start: startIndex,
        end: stopIndex,
        // 删选参数
        ...this.filter
      })
      Toast.hide()
      const { count, list } = res.body
      if (count > 0) {
        Toast.info(`共查询到${count}套房源`, 0.5)
      }
      //重新赋值
      this.setState({
        count,
        houseList: [...this.state.houseList, ...list]
      })

      resolve()
    })
  }

  //房源列表
  renderHouseList = () => {
    const { count } = this.state

    //如果没有房源是 提示
    if (count <= 0) {
      // return <NoHouse>{'没有找到房源,请您换个搜索条件~~'}</NoHouse>
      Toast.info('没有找到房源,请您换个搜索条件~~')
    }

    return (
      //长列表+滚动
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={count}
        minimumBatchSize={21}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => (
              <AutoSizer>
                {({ width }) => (
                  <List
                    autoHeight
                    scrollTop={scrollTop}
                    isScrolling={isScrolling}
                    height={height}
                    rowCount={count}
                    rowHeight={120}
                    rowRenderer={this.rowRenderer}
                    width={width}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    )
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
        {/* 删选条 */}
        <Sticky height={45}>
          <Filter onFilter={this.onFilter} />
        </Sticky>
        {/* 房源列表 */}
        <div className={styles.houseList}>
          {this.state.houseList && this.renderHouseList()}
        </div>
      </div>
    )
  }
}

export default HouseList
