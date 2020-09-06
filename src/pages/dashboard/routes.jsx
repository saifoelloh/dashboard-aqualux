import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import DashboardHome from 'pages/dashboard/home'
import { NotFound } from 'pages/error'
import { PrivateRoute } from 'utils/route'
import { RouteAdmin } from 'pages/dashboard/admin/routes'
import { RouteCustomer } from 'pages/dashboard/customer/routes'
import { RouteOrder } from 'pages/dashboard/order/routes'
import { RouteBranch } from 'pages/dashboard/branch/routes'
import { RoutePackage } from 'pages/dashboard/package/routes'

const DashboardRoute = () => {
  const { path } = useRouteMatch()
  const routes = [
    {
      path: '/',
      component: DashboardHome,
      exact: true,
    },
    ...RouteAdmin,
    ...RouteCustomer,
    ...RouteOrder,
    ...RouteBranch,
    ...RoutePackage,
  ]

  return (
    <Switch>
      {routes.map((route, index) =>
        route?.private === undefined ? (
          <Route
            key={index}
            path={path + route.path}
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
