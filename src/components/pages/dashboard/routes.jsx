import { NotFound } from 'components/pages/error'
import DashboardHome from 'components/pages/dashboard/home'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PrivateRoute } from 'utils/route'
import { RouteAdmin } from 'components/pages/dashboard/admin/routes'
import { RouteBranch } from 'components/pages/dashboard/branch/routes'
import { RouteCustomer } from 'components/pages/dashboard/customer/routes'
import { RouteOrder } from 'components/pages/dashboard/order/routes'
import { RoutePackage } from 'components/pages/dashboard/package/routes'
import { RouteShipping } from 'components/pages/dashboard/shipping/routes'

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
    ...RouteShipping,
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
