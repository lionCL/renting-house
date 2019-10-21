import React, { Component } from 'react'

import styles from './index.module.scss'
import classNames from 'classnames'

//导入子组件
import FilterFooter from '@/views/HouseList/components/FilterFooter'

export default class FilterMore extends Component {
  constructor(props) {
    super()
    this.state = {
      selectedValues: props.defaultValue
    }
  }

  //点击筛选条件
  toggle = value => {
    let { selectedValues } = this.state

    //判断此次点击的value是否在数组中
    if (selectedValues.includes(value)) {
      //过滤出相同的值
      selectedValues = selectedValues.filter(item => item !== value)
    } else {
      selectedValues.push(value)
    }
    //更新到state
    this.setState({
      selectedValues
    })
  }

  //渲染标签
  renderItem = data => {
    const { selectedValues } = this.state
    return data.map(item => {
      //判断是否被选中
      const isSelected = selectedValues.includes(item.value)

      return (
        <span
          key={item.value}
          className={classNames(styles.tag, { [styles.tagActive]: isSelected })}
          onClick={() => this.toggle(item.value)}
        >
          {item.label}
        </span>
      )
    })
  }

  render() {
    const {
      data: { characteristic, floor, oriented, roomType },
      onSave,
      onCancel
    } = this.props
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={onCancel}></div>
        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderItem(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderItem(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderItem(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderItem(characteristic)}</dd>
          </dl>
        </div>
        {/* 删除确定 */}
        <div className={styles.footer}>
          <FilterFooter
            cancelText={'清除'}
            onCancel={() => this.setState({ selectedValues: [] })}
            onSave={() => onSave('more', this.state.selectedValues)}
          ></FilterFooter>
        </div>
      </div>
    )
  }
}
