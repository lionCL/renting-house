import React from 'react'
import PropTypes from 'prop-types'
//高阶组件 让普通的路由也带props
import { withRouter } from 'react-router'
import { Flex } from 'antd-mobile'

//导入样式
import styles from './index.module.scss'

//结构props
function SearchHeader({ cityName, history }) {
  return (
    <div className={styles.root}>
      <Flex>
        <Flex className={styles.searchLeft}>
          <div
            className={styles.location}
            onClick={() => history.push('/citylist')}
          >
            <span>{cityName}</span>
            <i className="iconfont icon-arrow"></i>
          </div>
          <div className={styles.searchForm}>
            <i className="iconfont icon-search"></i>
            <span>请输入地址</span>
          </div>
        </Flex>
        <i
          className="iconfont icon-map"
          onClick={() => history.push('/map')}
        ></i>
      </Flex>
    </div>
  )
}

//传值规则
SearchHeader.propTypes = {
  cityName: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default withRouter(SearchHeader)
