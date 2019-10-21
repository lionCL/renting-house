import React from 'react'
import styles from './index.module.scss'
// import { BASE_URL } from './node_modules/@/utils/url'
import PropTypes from 'prop-types'

function NoHouse({ children }) {
  return (
    <div className={styles.root}>
      {/* <img
        className={styles.img}
        alt=""
        src={`${BASE_URL}img/not-found.png`}
      ></img> */}
      <p className={styles.msg}>{children}</p>
    </div>
  )
}

NoHouse.propTypes = {
  children: PropTypes.string.isRequired
}

export default NoHouse
