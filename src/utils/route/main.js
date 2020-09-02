import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Login } from 'pages/auth'
import Dashboard from 'pages/dashboard/index'
import { NotFound } from 'pages/error'
import PrivateRoute from './private-route'

const MainRoutes = () => {
  const routes = [
    {
      path: '/auth/login',
      component: Login,
      exact: true,
    },
    {
      path: '/dashboard',
      component: Dashboard,
    },
  ]

  return (
    <Switch>
      {routes.map((route, index) =>
        route.private === undefined ? (
          <Route
            key={index}
            path={route.path}
            component={route.component}
            exact={route?.exact}
          />
        ) : (
          <PrivateRoute
            key={index}
            path={route.path}
            component={route.component}
            exact={route?.exact}
          />
        ),
      )}

      <Route path="*" component={NotFound} />
    </Switch>
  )
}

export default MainRoutes
