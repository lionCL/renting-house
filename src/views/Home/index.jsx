import React, { Component } from 'react'
//导入路由
import { Route } from 'react-router-dom'

//导入TabBar
import { TabBar } from 'antd-mobile'

//导入样式
import styles from './index.module.scss'

// 导入Home的子组件
import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'

class Home extends Component {
  constructor(props) {
    super()
    this.state = {
      //当前路由的地址
      selectedTab: props.location.pathname
    }
  }

  //TabBar数组
  tabsData = [
    {
      title: '首页',
      icon: 'icon-index',
      path: '/home'
    },
    {
      title: '找房',
      icon: 'icon-findHouse',
      path: '/home/list'
    },
    {
      title: '资讯',
      icon: 'icon-info',
      path: '/home/news'
    },
    {
      title: '我的',
      icon: 'icon-my',
      path: '/home/profile'
    }
  ]
  //dom更新完毕,
  // componentDidUpdate(prevProps) {
  //   if (prevProps.location.pathname !== this.props.location.pathname) {
  //     this.setState({
  //       selectedTab: this.props.location.pathname
  //     })
  //   }

  //   console.log(1111)
  // }
  //props改变时候触发  此钩子里面发送setState时候只会渲染一次
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedTab: nextProps.location.pathname
    })
    // console.log(222)
  }

  //渲染TabBar
  renderTabBar = () => {
    return (
      <TabBar tintColor="#21B97A" noRenderContent>
        {this.tabsData.map(item => {
          return (
            <TabBar.Item
              title={item.title}
              key={item.path}
              icon={<i className={`iconfont ${item.icon}`} />}
              selectedIcon={<i className={`iconfont ${item.icon}`} />}
              selected={this.state.selectedTab === item.path}
              onPress={() => {
                //判断当相等的时候 不做跳转
                if (this.props.location.pathname !== item.path) {
                  //编程式导航跳转路由
                  this.props.history.push(item.path)
                }
              }}
            ></TabBar.Item>
          )
        })}
      </TabBar>
    )
  }

  render() {
    return (
      <div className={styles.home}>
        {/* 跳转路由 */}
        <div>
          <Route exact path="/home" component={Index} />
          <Route path="/home/list" component={HouseList} />
          <Route path="/home/news" component={News} />
          <Route path="/home/profile" component={Profile} />
        </div>
        {/* TabBar */}
        <div className={styles.tabBar}>{this.renderTabBar()}</div>
      </div>
    )
  }
}

export default Home
