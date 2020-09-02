import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import DashboardHome from 'pages/dashboard/home'
import { NotFound } from 'pages/error'
import { PrivateRoute } from 'utils/route'

const DashboardRoute = () => {
  const { path } = useRouteMatch()
  const routes = [
    {
      path: `${path}`,
      component: DashboardHome,
      exact: true,
    },
    {
      path: `${path}admin`,
      component: () => <h1>Admin</h1>,
      exact: true,
    },
    {
      path: `${path}customer`,
      component: () => <h1>Customer</h1>,
      exact: true,
    },
    {
      path: `${path}order`,
      component: DashboardHome,
      exact: true,
    },
  ]

  return (
    <Switch>
      {routes.map((route, index) =>
        route?.private === undefined ? (
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

export default DashboardRoute
