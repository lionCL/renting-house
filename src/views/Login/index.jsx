import React, { Component } from 'react'
import styles from './index.module.scss'
//导入组件
import NavHeader from '@/components/NavHeader'
//第三方UI
import { WingBlank, Flex } from 'antd-mobile'
//表单验证
import { Form, Field, withFormik, ErrorMessage } from 'formik'
//验证规则
import * as yup from 'yup'

class Login extends Component {
  render() {
    return (
      <div className={styles.root}>
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WingBlank size="lg">
          <Form>
            <div className={styles.formSubmit}>
              <Field
                placeholder="请输入用户名"
                className={styles.input}
                type="text"
                name="username"
              />
              {/* 错误提示 */}
              <ErrorMessage
                name="username"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.formSubmit}>
              <Field
                placeholder="请输入密码"
                className={styles.input}
                type="password"
                name="password"
              />
              {/* 错误提示 */}
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.formSubmit}>
              <input className={styles.submit} type="submit" />
            </div>
          </Form>
          <Flex className={styles.backHome}>
            <Flex.Item>还没有账号，去注册~</Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

// const PHONE_REGEX = /^1[345678][0-9]{9}$/
const REG_USERNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PASSWORD = /^[a-zA-Z_\d]{5,12}$/

// 通过 withFormik 包裹一下，然后增强
const EnhancedLogin = withFormik({
  //1.默认值 必须和form中name属性值一一对应
  mapPropsToValues: () => ({ username: 'test2', password: 'test2' }),
  //2. 校验 username 和 password模式
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .required('用户名不能为空')
      .matches(REG_USERNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: yup
      .string()
      .required('密码不能为空')
      .matches(REG_PASSWORD, '长度为5到12位，只能出现数字、字母、下划线')
  }),
  //3.处理提交请求
  handleSubmit: values => {
    console.log(values)
  }
})(Login)

export default EnhancedLogin
