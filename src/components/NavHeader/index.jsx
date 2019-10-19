import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'

//导入样式
import styles from './index.module.scss'

import { NavBar } from 'antd-mobile'

function NavHeader({ history, children, className, rightContent }) {
  return (
    <NavBar
      mode="light"
      icon={<i className="iconfont icon-back"></i>}
      onLeftClick={() => history.goBack()}
      className={[styles.navBar, className].join(' ')}
      rightContent={rightContent}
    >
      {children}
    </NavBar>
  )
}
//传值规则
NavHeader.propTypes = {
  children: PropTypes.string.isRequired
}

export default withRouter(NavHeader)
