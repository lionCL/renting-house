import React, { Component } from 'react'

import styles from './index.module.scss'
//api
import { getCurrentCity } from '@/utils/city'
import { FilterList } from '@/api'

//导入子组件
import FilterTitle from '@/views/HouseList/components/FilterTitle'
import FilterPicker from '@/views/HouseList/components/FilterPicker'
import FilterMore from '@/views/HouseList/components/FilterMore'

// 导入动画库
import { Spring } from 'react-spring/renderprops'

export default class Filter extends Component {
  constructor() {
    super()
    this.state = {
      titleSelectedStatus: {
        //标题选中状态,true为选中
        area: false,
        mode: false,
        price: false,
        more: false
      },
      openType: '', //记录当前点击打开的是哪个类型  area/mode/price/more
      filterData: {}, //筛选条件数据
      selectValues: {
        area: ['area', 'null'],
        mode: ['null'],
        price: ['null'],
        more: []
      }
    }
  }

  componentDidMount() {
    this.getFilterData()
  }

  //获取筛选条件方法
  async getFilterData() {
    //获取城市id
    const { value } = await getCurrentCity()
    //发送请求
    const res = await FilterList(value)
    // console.log(res)
    this.setState({
      filterData: res.body
    })
  }

  //改变删选标题高亮的状态的方法
  changeTitleSelectedStatus = type => {
    const { titleSelectedStatus, selectValues } = this.state
    Object.keys(titleSelectedStatus).forEach(key => {
      if (key === 'area') {
        //判断area有么有选择数据 有选择数据为true 没有为false
        titleSelectedStatus[key] = selectValues[key][1] !== 'null'
      } else if (key === 'mode' || key === 'price') {
        titleSelectedStatus[key] = selectValues[key][0] !== 'null'
      } else if (key === 'more') {
        //判断more有么有数据  有数据数组长度大于0为true 没有为false
        titleSelectedStatus[key] = selectValues[key].length > 0
      }
    })
    //把相应的type设置为true 高亮
    if (type) {
      titleSelectedStatus[type] = true
    }
    //重新赋值state
    this.setState({
      titleSelectedStatus
    })
  }

  //点击筛选title事件
  onTitleClick = type => {
    const { titleSelectedStatus } = this.state

    //修改对象值
    this.setState(
      {
        openType: type,
        titleSelectedStatus: {
          ...titleSelectedStatus, //对象展开
          [type]: true //属相相同的值 进行替换
        }
      },
      () => {
        //重置高亮状态(点击的title)
        this.changeTitleSelectedStatus(type)
      }
    )
  }

  //确认的方法
  onSave = (type, value) => {
    const { selectValues } = this.state
    this.setState(
      {
        openType: '',
        selectValues: {
          ...selectValues,
          [type]: value
        }
      },
      () => {
        //处理filterTitle的选中状态
        this.changeTitleSelectedStatus()

        // todo 把收集到的数据，经过处理，然后传递给HouseList作为查询房源列表的参数
        const { selectValues } = this.state
        const filterData = {}
        //处理区域数据
        const key = selectValues['area'][0]
        if (selectValues['area'].length === 2) {
          filterData[key] = null
        } else if (selectValues['area'].length === 3) {
          filterData[key] =
            selectValues['area'][2] === 'null'
              ? selectValues['area'][1]
              : selectValues['area'][2]
        }
        //处理方式的数据
        filterData.rentType = selectValues['mode'][0]
        //处理租金的数据
        filterData.price = selectValues['price'][0]
        //处理more
        filterData.more = selectValues['more'].join(',')

        //当onFilter存在时候调用
        this.props.onFilter && this.props.onFilter(filterData)
      }
    )
  }

  //取消的方法
  onCancel = () => {
    //还原选中的状态
    this.setState(
      {
        openType: ''
      },
      () => {
        this.changeTitleSelectedStatus()
      }
    )
  }

  // 遮罩层渲染
  renderMask = () => {
    const { openType } = this.state
    //是否隐藏
    const isHide = openType === 'more' || openType === ''

    return (
      <Spring to={{ opacity: isHide ? 0 : 1 }} config={{ duration: 300 }}>
        {props => {
          if (props.opacity === 0) {
            return null
          }

          return (
            <div
              style={props}
              className={styles.mask}
              onClick={this.onCancel}
            ></div>
          )
        }}
      </Spring>
    )
  }

  // 渲染filterPicker
  renderFilterPicker = () => {
    const {
      openType,
      selectValues,
      filterData: { area, price, rentType, subway }
    } = this.state

    //判断如果openTYpe 为空 或者为more 直接返回
    if (openType === '' || openType === 'more') return null
    //传递子组件的默认值
    let data = null
    let cols = 1
    const defaultValue = selectValues[openType] //默认值
    switch (openType) {
      case 'area':
        cols = 3
        data = [area, subway]
        break
      case 'mode':
        data = rentType
        break
      case 'price':
        data = price
        break
      default:
        break
    }
    return (
      <FilterPicker
        defaultValue={defaultValue}
        data={data}
        cols={cols}
        type={openType}
        onCancel={this.onCancel}
        onSave={this.onSave}
      />
    )
  }

  //渲染筛选more
  renderFilterMore = () => {
    const { openType } = this.state
    if (openType !== 'more') return null
    //取出值
    const {
      filterData: { characteristic, floor, oriented, roomType },
      selectValues
    } = this.state

    //判断
    if (openType !== 'more') return null

    const data = { characteristic, floor, oriented, roomType }

    const defaultValue = selectValues['more']

    return (
      <FilterMore
        data={data}
        defaultValue={defaultValue}
        onSave={this.onSave}
        onCancel={this.onCancel}
      />
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        {this.renderMask()}
        {/* 内容 */}
        <div className={styles.content}>
          {/* 过滤条标题 */}
          <FilterTitle
            titleSelectedStatus={this.state.titleSelectedStatus}
            onTitleClick={this.onTitleClick}
          />
          {/* 过滤条的picker */}
          {this.renderFilterPicker()}
          {/* 过滤条的More */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}
