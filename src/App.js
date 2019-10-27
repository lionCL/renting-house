import React, { lazy, Suspense } from 'react'

//导入路由
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

//全局字体图标样式
import './assets/fonts/iconfont.css'

//导入长列表优化样式
import 'react-virtualized/styles.css'

//导入鉴权组件
import AuthRoute from '@/components/AuthRoute'

//全局样式   放到最后以免被其他组件样式覆盖
import './App.css'

//导入组件
// import Home from './views/Home'
// import Login from './views/Login'
// import CityList from './views/CityList'
// import Map from './views/Map'
// import Detail from '@/views/Detail'
// import Rent from '@/views/Rent'
// import RentAdd from '@/views/Rent/RentAdd/'
// import Search from '@/views/Rent/Search/'
//优化路由懒加载
const Home = lazy(() => import('@/views/Home'))
const Login = lazy(() => import('@/views/Login'))
const CityList = lazy(() => import('@/views/CityList'))
const Map = lazy(() => import('@/views/Map'))
const Detail = lazy(() => import('@/views/Detail'))
const Rent = lazy(() => import('@/views/Rent'))
const RentAdd = lazy(() => import('@/views/Rent/RentAdd'))
const Search = lazy(() => import('@/views/Rent/Search'))

function App() {
  return (
    <Router>
      {/*Suspense 配合路由懒加载使用 */}
      <Suspense fallback={<div>Loading...</div>}>
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
            <AuthRoute path="/rent/add">
              <RentAdd />
            </AuthRoute>
            <AuthRoute path="/rent/search">
              <Search />
            </AuthRoute>

            <Redirect exact from="/" to="/home" />
          </Switch>
        </div>
      </Suspense>
    </Router>
  )
}

export default App
