import React, { Component } from 'react'
import styles from './index.module.scss'
//导入子组件
import NavHeader from '@/components/NavHeader'

//导入api
import { getCityList, getHotCity } from '@/api'

import { getCurrentCity } from '@/utils/city.js'
import { setCity } from '@/utils/token'

//导入长列表
import { AutoSizer, List } from 'react-virtualized'
import { Toast } from 'antd-mobile'

//定义的常量
const CITY_TITLE_HEIGHT = 36
const CITY_ROW_HEIGHT = 50

const HOT_CITIES = ['北京', '上海', '广州', '深圳']

export default class CityList extends Component {
  constructor() {
    super()
    this.state = {
      cityListObj: {}, //  左边城市数据
      cityIndex: [], //右边城市首字母索引
      activeIndex: 0 //激活的索引，默认是第一个
    }
  }

  listRef = React.createRef()
  componentDidMount() {
    this.getCityListData()
  }

  //改变城市
  changeCity = ({ label, value }) => {
    // 判断下，是否是 北、上、广、深，如果不是则给出提示，如果是则更新本地存储并且返回
    if (HOT_CITIES.includes(label)) {
      //保存当前城市到本地
      setCity({ label, value })
      //条状路由
      this.props.history.goBack()
    } else {
      Toast.info('该城市暂无房源哦~', 1)
    }
  }

  //获取城市列表信息 并对数据进行处理
  async getCityListData() {
    let res = await getCityList(1)
    // console.log(res)
    // 1、遍历城市列表数组
    const obj = {}
    res.body.forEach(item => {
      const letter = item.short.substr(0, 1)
      if (obj[letter]) {
        obj[letter].push(item)
      } else {
        obj[letter] = [item]
      }
    })
    // 2、根据 cityListObj 生成 索引数组 并排序 Es6 对象新方法 Object.keys()
    const cityIndex = Object.keys(obj).sort()
    // 3、获取并处理热门城市数据
    let hotCity = await getHotCity()
    cityIndex.unshift('hot')
    obj['hot'] = hotCity.body

    //4.处理城市定位
    const city = await getCurrentCity()
    cityIndex.unshift('#')
    // console.log(city)
    // const { label, value } = city
    obj['#'] = [city]

    // console.log(cityListObj, cityIndex)
    //赋值给模型
    this.setState(
      {
        cityListObj: obj,
        cityIndex
      },
      () => {
        //计算所有的行信息,为将来切换表格服务
        this.listRef.current.measureAllRows()
        // console.log(this.listRef.current)
      }
    )
  }

  //渲染右侧每一行的数据
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) => {
    //获取城市首字母
    const letter = this.state.cityIndex[index]
    //索引字母下标的对应的城市列表
    const list = this.state.cityListObj[letter]

    return (
      <div key={key} style={style} className={styles.city}>
        {/* 标题 */}
        <div className={styles.title}>{this.formatLetter(letter)}</div>
        {/* 城市列表 */}
        {list.map(item => {
          return (
            <div
              key={item.value}
              className={styles.name}
              onClick={() => {
                this.changeCity(item)
              }}
            >
              {item.label}
            </div>
          )
        })}
      </div>
    )
  }
  //过滤 letter
  formatLetter(letter) {
    switch (letter) {
      case '#':
        return '定位城市'

      case 'hot':
        return '热门城市'

      default:
        return letter.toUpperCase()
    }
  }
  // 计算每一行的高度
  calcRowHeight = ({ index }) => {
    // 首先根据索引，拿到cityIndex中的字母
    const letter = this.state.cityIndex[index]
    // 拿到字母对应的城市列表
    const list = this.state.cityListObj[letter]
    return CITY_TITLE_HEIGHT + list.length * CITY_ROW_HEIGHT
  }

  //渲染右边索引条
  renderRight = () => {
    return (
      <div className={styles.cityIndex}>
        {this.state.cityIndex.map((item, index) => {
          return (
            <div
              key={item}
              className={styles.cityIndexItem}
              onClick={() => {
                this.cityIndexClick(index)
              }}
            >
              <span
                className={
                  index === this.state.activeIndex ? styles.indexActive : ''
                }
              >
                {item === 'hot' ? '热' : item.toUpperCase()}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
  //list滚动时候触发  修改activeIndex 为当前的startIndex
  rowsRendered = ({ startIndex }) => {
    // console.log('startIndex', startIndex)

    //当startIndex 不等于activeIndex的时候设置高亮
    if (startIndex !== this.state.activeIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }

  //索引条点击事件
  cityIndexClick = index => {
    //点击list滚到当前的 index
    // console.log('index', index)

    this.listRef.current.scrollToRow(index)
  }

  render() {
    const { cityIndex } = this.state
    return (
      <div className={styles.cityList}>
        {/* 渲染头部导航   标签里面的内容就是children */}
        <NavHeader>城市列表</NavHeader>
        {/* / List外层包裹AutoSizer的目的是为了拿到我们屏幕的宽高 */}
        {cityIndex.length > 0 && (
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={this.listRef}
                width={width} // 整个list的宽度
                height={height} //整个List组件的高度. 注意设置高度,如果没有高度,行就无法渲染出来
                rowCount={cityIndex.length} //显示多少条数据
                rowHeight={this.calcRowHeight} //每一行数据的高度
                rowRenderer={this.rowRenderer} //渲染每一行的数据
                onRowsRendered={this.rowsRendered} //list滚动时候触发
                scrollToAlignment="start" //判断的位置  auto start  end
              />
            )}
          </AutoSizer>
        )}
        {/* 右侧索引导航渲染 */}
        {cityIndex.length > 0 && this.renderRight()}
      </div>
    )
  }
}
