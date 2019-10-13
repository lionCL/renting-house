import React, { Component } from 'react'

//轮播
import { Carousel } from 'antd-mobile'
//样式
import styles from './index.module.scss'
//导入api
import { getCarousel } from '@/api'
//导入环境地址
import { BASE_URL } from '@/utils/url.js'

export class Index extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      //正在加载轮播
      imgList: [],
      imgHeight: 212
    }
  }

  async componentDidMount() {
    let res = await getCarousel()
    // console.log(res.data)
    if (res.data.status === 200) {
      this.setState({
        isLoading: false,
        imgList: res.data.body
      })
    }
  }

  // 渲染轮播
  renderCarousel = () => {
    return (
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
    )
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 渲染轮播 */}
        <div className={styles.carousel}>
          {!this.state.isLoading && this.renderCarousel()}
        </div>
      </div>
    )
  }
}

export default Index
