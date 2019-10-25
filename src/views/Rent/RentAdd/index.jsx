import React, { Component } from 'react'

//导入子组件
import NavHeader from '@/components/NavHeader'
import HousePackage from '@/components/HousePackage'

import { withRouter } from 'react-router-dom'
//API
import { uploadHouseImg, publishHouse } from '@/api/user'

import styles from './index.module.scss'
import {
  List,
  InputItem,
  Picker,
  ImagePicker,
  TextareaItem,
  Flex,
  Modal,
  Toast
} from 'antd-mobile'
const Item = List.Item

// 房屋类型
const roomTypeData = [
  { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
  { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
  { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
  { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
  { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
]

//朝向
const orientedData = [
  { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
  { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
  { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
  { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
  { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
  { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
  { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
  { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
]

// 楼层
const floorData = [
  { label: '高楼层', value: 'FLOOR|1' },
  { label: '中楼层', value: 'FLOOR|2' },
  { label: '低楼层', value: 'FLOOR|3' }
]

class RentAdd extends Component {
  constructor(props) {
    super()

    let community = null
    let communityName = null

    if (props.location.search.length > 0) {
      const searchParams = new URLSearchParams(props.location.search)

      community = searchParams.get('community')
      communityName = searchParams.get('communityName')
    }

    this.state = {
      files: [], // 临时存取图片的数组
      community, // 小区的id
      communityName, // 小区的名字
      title: '', // 标题
      description: '', // 描述
      // houseImg: '', // 图片
      oriented: '', // 朝向
      supporting: '', // 房屋配备
      price: '', // 租金
      roomType: '', // 户型
      size: '', // 面积
      floor: '' // 楼层
    }
  }

  //获取输入框的值赋值给state方法
  setValue = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  //获取子组件中选中的房屋配套值
  onSelect = values => {
    const strs = []
    values.forEach(item => {
      strs.push(item.name)
    })

    this.setState({
      supporting: strs.join('|')
    })
  }

  //取消发布
  onCancel = () => {
    Modal.alert('提示', '放弃发布房源?', [
      { text: '放弃', onPress: () => this.props.history.goBack() },
      { text: '继续编辑', onPress: null }
    ])
  }

  //上传图片
  onChange = (files, type, index) => {
    this.setState({
      files
    })
  }

  //发布房源信息
  addHouse = async () => {
    const { files } = this.state
    //上传图片 拿到图片地址后 发布房源请求
    if (files.length === 0) {
      Toast.info('请先上传图片,再发布房源~', 1.5)
      return
    }
    //上传图片
    const fd = new FormData()
    files.forEach(item => {
      fd.append('file', item.file)
    })
    //发送请求
    const res = await uploadHouseImg(fd)
    console.log(res)
    let houseImg
    if (res.status === 200) {
      houseImg = res.body.join('|')
    }

    // 发布
    const {
      title,
      description,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community
    } = this.state

    const result = await publishHouse({
      title,
      description,
      houseImg,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community
    })
    console.log(result)

    if (result.status === 200) {
      Toast.info('发布成功', 1.5, () => {
        this.props.history.replace('/rent')
      })
    } else {
      Toast.info('发布失败', 1.5)
    }
  }

  render() {
    const {
      files,
      communityName,
      title,
      description,
      oriented,
      price,
      roomType,
      size,
      floor
    } = this.state
    return (
      <div className={styles.root}>
        {/* 渲染头部 */}
        <NavHeader className={styles.addHeader}>发布房源</NavHeader>
        {/* 房源信息 */}
        <List renderHeader={() => '房源信息'} className="my-list">
          <Item
            arrow="horizontal"
            onClick={() => this.props.history.push('/rent/search')}
            extra={communityName || '请输入小区名称'}
          >
            小区名称
          </Item>
          <InputItem
            onErrorClick={() => {}}
            placeholder="请输入租金/月"
            extra="¥/月"
            value={price}
            onChange={val => this.setValue('price', val)}
          >
            租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金
          </InputItem>
          <InputItem
            onErrorClick={() => {}}
            placeholder="请输入建筑面积"
            extra="m²"
            value={size}
            onChange={val => this.setValue('size', val)}
          >
            建筑面积
          </InputItem>
          <Picker
            data={roomTypeData}
            cols={1}
            className="forss"
            value={[roomType]}
            onChange={val => this.setValue('roomType', val[0])}
          >
            <List.Item arrow="horizontal">
              户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型
            </List.Item>
          </Picker>
          <Picker
            data={floorData}
            cols={1}
            className="forss"
            value={[floor]}
            onChange={val => this.setValue('floor', val[0])}
          >
            <List.Item arrow="horizontal">所在楼层</List.Item>
          </Picker>
          <Picker
            data={orientedData}
            cols={1}
            className="forss"
            value={[oriented]}
            onChange={val => this.setValue('oriented', val[0])}
          >
            <List.Item arrow="horizontal">
              朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向
            </List.Item>
          </Picker>
        </List>
        {/* 房屋标题 */}
        <List renderHeader={() => '房屋标题'} className="my-list">
          <InputItem
            placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
            value={title}
            onChange={val => this.setValue('title', val)}
          ></InputItem>
        </List>
        {/* 房屋头像 */}
        <List renderHeader={() => '房屋头像'} className="my-list">
          <ImagePicker
            files={files}
            onChange={this.onChange}
            selectable={files.length < 9}
            multiple={true}
          />
        </List>
        {/* 房屋配套 */}
        <List renderHeader={() => '房屋配套'} className="my-list">
          <HousePackage select onSelect={this.onSelect} />
        </List>
        {/* 房屋描述 */}
        <List renderHeader={() => '房屋描述'} className="my-list">
          <TextareaItem
            rows={5}
            placeholder="请输入房屋描述"
            autoHeight
            value={description}
            onChange={val => this.setValue('description', val)}
          />
        </List>
        {/* 底部按钮 */}
        <Flex className={styles.bottom}>
          <Flex.Item className={styles.cancel} onClick={this.onCancel}>
            取消
          </Flex.Item>
          <Flex.Item className={styles.confirm} onClick={this.addHouse}>
            提交
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}

export default withRouter(RentAdd)
