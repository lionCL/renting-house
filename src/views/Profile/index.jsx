import React, { Component } from 'react'
import { Button, Grid } from 'antd-mobile'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { BASE_URL } from '@/utils/url'

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-index', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

export class Profile extends Component {
  constructor() {
    super()
    this.state = {
      userInfo: {
        avatar: '/img/avatar.png',
        nickname: '游客'
      }
    }
  }
  render() {
    const { avatar, nickname } = this.state.userInfo
    return (
      <>
        <div className={styles.title}>
          <img
            src={`${BASE_URL}/img/profile/bg.png`}
            className={styles.bg}
            alt=""
          />
          <div className={styles.info}>
            <img
              src={`${BASE_URL}${avatar}`}
              className={styles.myIcon}
              alt=""
            />
            <div className={styles.user}>
              <div className={styles.name}>{nickname}</div>
              <div className={styles.edit}>
                <Button
                  type="primary"
                  size="small"
                  inline
                  onClick={() => this.props.history.push('/login')}
                >
                  去登录
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* 菜单项 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          square={false}
          renderItem={dataItem => (
            <Link to={dataItem.to}>
              <div className={styles.menuItem}>
                <i className={`iconfont ${dataItem.icon}`}></i>
                <span>{dataItem.name}</span>
              </div>
            </Link>
          )}
        />
        {/* 广告 */}
        <div className={styles.ad}>
          <img src={`${BASE_URL}/img/profile/join.png`} alt="" />
        </div>
      </>
    )
  }
}

export default Profile
