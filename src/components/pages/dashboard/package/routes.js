import DashboardPackage from './index'
import DashboardPackageCreate from './create'
import DashboardPackageEdit from './edit'

const RoutePackage = [
  {
    path: '/package',
    component: DashboardPackage,
    exact: true,
  },
  {
    path: '/package/create',
    component: DashboardPackageCreate,
    exact: true,
  },
  {
    path: '/package/edit',
    component: DashboardPackageEdit,
    exact: true,
  },
]

export { RoutePackage }
