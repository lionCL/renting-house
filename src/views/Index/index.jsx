import React, { Component } from 'react'
//导入路由
import { Link } from 'react-router-dom'

//antd-mobile按需导入
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile'
//样式
import styles from './index.module.scss'
//导入api
import { getCarousel, getGroups, getNews } from '@/api'
//导入环境地址
import { BASE_URL } from '@/utils/url.js'
//导入导航图片
import image1 from '@/assets/images/nav-1.png'
import image2 from '@/assets/images/nav-2.png'
import image3 from '@/assets/images/nav-3.png'
import image4 from '@/assets/images/nav-4.png'

//导入子组件
import SearchHeader from '@/components/SearchHeader'

//导入获取本地操作的方法
import { getCurrentCity } from '@/utils/city'

export class Index extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true, //正在加载轮播
      imgList: [], //轮播图片信息
      imgHeight: 212,
      groups: [], //住房小组信息
      news: [], //最新资讯信息
      currentCity: '深圳'
    }
  }
  //导航菜单数据
  navData = [
    { icon: image1, text: '整租', path: '/home/list' },
    { icon: image2, text: '合租', path: '/home/list' },
    { icon: image3, text: '地图找房', path: '/map' },
    { icon: image4, text: '去出租', path: '/rent/add' }
  ]

  componentDidMount() {
    this.getCarouselData()
    this.getGroupsData()
    this.getNewsData()
    this.getLocationCity()
  }

  //获取定位城市并设置
  async getLocationCity() {
    const { label } = await getCurrentCity()

    this.setState({
      currentCity: label
    })
  }

  //获取轮播数据
  async getCarouselData() {
    let res = await getCarousel()
    // console.log(res.data)
    if (res.status === 200) {
      this.setState({
        isLoading: false,
        imgList: res.body
      })
    }
  }
  //获取租房小组信息
  async getGroupsData() {
    let res = await getGroups('AREA|88cff55c-aaa4-e2e0')
    // console.log(res)
    if (res.status === 200) {
      this.setState({
        groups: res.body
      })
    }
  }
  //获取资讯信息
  async getNewsData() {
    let res = await getNews('AREA|88cff55c-aaa4-e2e0')
    // console.log(res)
    if (res.status === 200) {
      this.setState({
        news: res.body
      })
    }
  }

  //获取本地

  // 渲染轮播
  renderCarousel = () => {
    return (
      <div className={styles.carousel}>
        <Carousel autoplay infinite>
          {this.state.imgList.map(item => (
            <a
              key={item.id}
              href="http://www.alipay.com"
              style={{
                display: 'inline-block',
                width: '100%',
                height: this.state.imgHeight
              }}
            >
              <img
                src={`${BASE_URL}${item.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    )
  }
  //渲染导航部分
  renderNav = () => {
    return (
      <div className={styles.nav}>
        <Flex>
          {this.navData.map(item => {
            return (
              <Flex.Item key={item.text}>
                <Link to={item.path}>
                  <img src={item.icon} alt="" />
                  <p>{item.text}</p>
                </Link>
              </Flex.Item>
            )
          })}
        </Flex>
      </div>
    )
  }
  //渲染租房小组
  renderGroups = () => {
    return (
      <div className={styles.groups}>
        <Flex>
          <Flex.Item>
            <span className={styles.title}>租房小组</span>
          </Flex.Item>
          <Flex.Item align="end">
            <span>更多</span>
          </Flex.Item>
        </Flex>
        {/* 宫格 */}
        <Grid
          data={this.state.groups}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={item => {
            return (
              <div className={styles.navItem}>
                <div className={styles.left}>
                  <p>{item.title}</p>
                  <p>{item.desc}</p>
                </div>
                <div className={styles.right}>
                  <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
                </div>
              </div>
            )
          }}
        />
      </div>
    )
  }
  //渲染最新资讯
  renderNews = () => {
    return (
      <div className={styles.news}>
        <h3 className={styles.groupTitle}>最新资讯</h3>
        {this.state.news.map(item => {
          return (
            <WingBlank size="md" className={styles.newsItem} key={item.id}>
              <div className={styles.imgWrap}>
                <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
              </div>
              <Flex
                className={styles.content}
                direction="column"
                justify="between"
              >
                <h3 className={styles.title}>{item.title}</h3>
                <Flex className={styles.info} justify="between">
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </Flex>
              </Flex>
            </WingBlank>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 渲染头部搜索栏 */}
        <SearchHeader cityName={this.state.currentCity}></SearchHeader>
        {/* 渲染轮播 */}
        {!this.state.isLoading && this.renderCarousel()}
        {/* 渲染导航菜单 */}
        {this.renderNav()}
        {/* 渲染租房小组 */}
        {this.renderGroups()}
        {/* 渲染最新资讯 */}
        {this.renderNews()}
      </div>
    )
  }
}

export default Index
