import DashboardOrder from './index'
import DashboardOrderCreate from './create'
import DashboardOrderEdit from './edit'

const RouteOrder = [
  {
    path: '/order',
    component: DashboardOrder,
    exact: true,
  },
  {
    path: '/order/create',
    component: DashboardOrderCreate,
    exact: true,
  },
  {
    path: '/order/edit',
    component: DashboardOrderEdit,
    exact: true,
  },
]

export { RouteOrder }
