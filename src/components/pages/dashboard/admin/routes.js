import DashboardAdmin from './index'
import DashboardAdminCreate from './create'
import DashboardAdminEdit from './edit'

const RouteAdmin = [
  {
    path: '/admin',
    component: DashboardAdmin,
    exact: true,
  },
  {
    path: '/admin/create',
    component: DashboardAdminCreate,
    exact: true,
  },
  {
    path: '/admin/edit',
    component: DashboardAdminEdit,
    exact: true,
  },
]

export { RouteAdmin }
