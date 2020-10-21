import DashboardCustomer from './index'
import DashboardCustomerCreate from './create'
import DashboardCustomerEdit from './edit'

const RouteCustomer = [
  {
    path: '/customer',
    component: DashboardCustomer,
    exact: true,
  },
  {
    path: '/customer/create',
    component: DashboardCustomerCreate,
    exact: true,
  },
  {
    path: '/customer/edit',
    component: DashboardCustomerEdit,
    exact: true,
  },
]

export { RouteCustomer }
