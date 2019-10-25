import React, { Component } from 'react'

//导入子组件
import NavHeader from '@/components/NavHeader'

import styles from './index.module.scss'

export default class RentAdd extends Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 渲染头部 */}
        <NavHeader className={styles.addHeader}>发布房源</NavHeader>
      </div>
    )
  }
}
