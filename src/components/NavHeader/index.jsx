import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { styles } from 'ansi-colors'

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
NavHeader.prototype = {
  children: PropTypes.string.isRequired
}

export default withRouter(NavHeader)
