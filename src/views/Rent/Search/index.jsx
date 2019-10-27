import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { SearchBar } from 'antd-mobile'
import styles from './index.module.scss'
import { getCommunity } from '@/api'
import { getCurrentCity } from '@/utils/city'

//使用仓库
import { connect } from 'react-redux'
import { saveCommunity } from '@/views/Rent/store/createAction'

//一个数据处理库类似jQuery 有解决抖动的方法 _表示lodash
import _ from 'lodash'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      searchText: '',
      tipsList: [] //关键字提示
    }
  }

  //解决抖动问题
  searchData = _.debounce(async val => {
    //获取当前城市值
    const { value } = await getCurrentCity()

    const res = await getCommunity({
      id: value,
      name: val
    })
    // console.log(res)

    // 赋值
    this.setState({
      tipsList: res.body
    })
  }, 500)

  //搜索栏值改变
  changeSearchText = val => {
    this.setState(
      {
        searchText: val
      },
      () => {
        if (val.trim().length === 0) {
          return
        }
        //执行搜索
        this.searchData(val)
      }
    )
  }

  //传递值给父组件add query方式
  sendCommunityData = ({ community, communityName }) => {
    // this.props.history.replace(
    //   `/rent/add?community=${community}&communityName=${communityName}`
    // )

    // 用仓库的方式传递数据
    this.props.save({ community, communityName })

    //返回add页面
    setTimeout(() => {
      this.props.history.goBack()
    }, 0)
  }

  // 渲染
  renderTips = () => {
    const { tipsList } = this.state

    return (
      <ul className={styles.tips}>
        {tipsList.map(item => {
          return (
            <li
              key={item.community}
              className={styles.tip}
              onClick={() => this.sendCommunityData(item)}
            >
              {item.communityName}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 搜索栏 */}
        <SearchBar
          placeholder="请输入小区或地址"
          onCancel={() => {
            this.setState({ searchText: '' }, () => {
              this.props.history.goBack()
            })
          }}
          value={this.state.searchText}
          onChange={this.changeSearchText}
        />
        {/* 渲染提示词 */}
        {this.state.tipsList.length > 0 && this.renderTips()}
      </div>
    )
  }
}

export default connect(
  null,
  dispatch => {
    return {
      //返回给props一个save方法
      save(community) {
        dispatch(saveCommunity(community))
      }
    }
  }
)(withRouter(Search))
