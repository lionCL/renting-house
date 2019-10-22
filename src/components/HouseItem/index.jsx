import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { BASE_URL } from '@/utils/url'

import { withRouter } from 'react-router-dom'

function HouseItem({ houseCode, houseImg, title, desc, tags, price, history }) {
  return (
    <div
      className={styles.house}
      onClick={() => history.push(`/detail/${houseCode}`)}
    >
      <div className={styles.imgWrap}>
        <img src={`${BASE_URL}${houseImg}`} className={styles.img} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.desc}>{desc}</div>
        {/* 标签渲染 */}
        {tags.map((tag, index) => {
          const tagName = `tag${index > 2 ? '3' : index + 1}` // tag1 or tag2 or tag3
          return (
            <span key={tag} className={[styles.tag, styles[tagName]].join(' ')}>
              {tag}
            </span>
          )
        })}
        <div className={styles.price}>{price} 元/月</div>
      </div>
    </div>
  )
}
//传值规则
HouseItem.propTypes = {
  houseCode: PropTypes.string.isRequired,
  houseImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  tags: PropTypes.array,
  price: PropTypes.number.isRequired
}

export default withRouter(HouseItem)
