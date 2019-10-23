import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuth } from '@/utils/token'

const AuthRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        // console.log(isAuth())

        return isAuth() ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }}
    />
  )
}

export default AuthRoute
