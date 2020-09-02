import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { useLocation, Link as RouterLink } from 'react-router-dom'

export default () => {
  const location = useLocation()
  const paths = location.pathname
    .split('/')
    .filter((path, id) => id > 0 && path !== '')

  return (
    <Breadcrumb className="text-capitalize">
      {paths.map((path, id) => {
        const isActive = id === paths.length - 1
        const url =
          id === 0 ? `/${path}/` : `/${paths.splice(0, id).join('/')}/${path}`
        return isActive ? (
          <BreadcrumbItem key={id} active={isActive}>
            {path}
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={id} tag={RouterLink} to={url}>
            {path}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
