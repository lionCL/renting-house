import React from 'react'

//导入路由
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

//全局字体图标样式
import './assets/fonts/iconfont.css'

//导入长列表优化样式
import 'react-virtualized/styles.css'

//导入鉴权组件
import AuthRoute from '@/components/AuthRoute'

//导入组件
import Home from './views/Home'
import Login from './views/Login'
import CityList from './views/CityList'
import Map from './views/Map'
import Detail from '@/views/Detail'
import Rent from '@/views/Rent'

//全局样式   放到最后以免被其他组件样式覆盖
import './App.css'

function App() {
  return (
    <Router>
      <div style={{ height: '100%' }}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/citylist" component={CityList} />
          <Route path="/map" component={Map} />
          <Route path="/detail/:id" component={Detail} />

          {/* 需要鉴权的路由 */}
          <AuthRoute path="/rent" exact>
            <Rent />
          </AuthRoute>

          <Redirect exact from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
