import DashboardBranch from './index'
import DashboardBranchCreate from './create'
import DashboardBranchEdit from './edit'

const RouteBranch = [
  {
    path: '/branch',
    component: DashboardBranch,
    exact: true,
  },
  {
    path: '/branch/create',
    component: DashboardBranchCreate,
    exact: true,
  },
  {
    path: '/branch/edit',
    component: DashboardBranchEdit,
    exact: true,
  },
]

export { RouteBranch }
