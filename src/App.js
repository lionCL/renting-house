import React from 'react'
//全局样式
import './App.css'

//导入路由
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

//全局字体图标样式
import './assets/fonts/iconfont.css'

//导入长列表优化样式
import 'react-virtualized/styles.css'

//导入组件
import Home from './views/Home'
import Login from './views/Login'
import CityList from './views/CityList'
import Map from './views/Map'

function App() {
  return (
    <Router>
      <div style={{ height: '100%' }}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/citylist" component={CityList} />
          <Route path="/map" component={Map} />
          <Redirect exact from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
