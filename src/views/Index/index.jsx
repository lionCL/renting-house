import React, { Component } from 'react'

//轮播
import { Carousel } from 'antd-mobile'
//样式
import styles from './index.module.scss'

export class Index extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      //正在加载轮播
      imgList: [],
      imgHeight: 212
    }
  }

  // 渲染轮播
  renderCarousel = () => {
    return (
      <Carousel autoplay infinite>
        {this.state.imgList.map(val => (
          <a
            key={val}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
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
