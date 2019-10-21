import React, { Component, createRef } from 'react'

import styles from './index.module.scss'

import PropTypes from 'prop-types'

export default class Sticky extends Component {
  //占位符
  placeholderRef = createRef()
  //内容区域
  contentRef = createRef()

  //滚动事件
  handleScroll = () => {
    // 获取到占位及内容区域的dom
    const placeholderEl = this.placeholderRef.current
    const contentEL = this.contentRef.current

    // 获取到滚动出去的距离
    const { top } = placeholderEl.getBoundingClientRect()
    //判断
    if (top <= 0) {
      //内容区域不可见 解决内容区域脱标的问题 height等于脱标的父盒子高度
      placeholderEl.style.height = `${this.props.height}px`
      //内容区域添加固定定位样式
      contentEL.classList.add(styles.fixed)
    } else {
      placeholderEl.style.height = `0px`
      contentEL.classList.remove(styles.fixed)
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  //移出监听事件
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <div>
        {/* 占位符 */}
        <div ref={this.placeholderRef}></div>
        {/* 内容区域 */}
        <div ref={this.contentRef}>{this.props.children}</div>
      </div>
    )
  }
}

Sticky.propTypes = {
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
}
