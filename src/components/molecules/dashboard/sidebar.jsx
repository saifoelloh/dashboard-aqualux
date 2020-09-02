import {
  faHome,
  faShoppingBasket,
  faUserSecret,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { ListGroup } from 'reactstrap'
import SidebarItem from 'components/atoms/sidebar-item.jsx'

export default () => {
  const menus = [
    {
      name: 'home',
      icon: faHome,
      url: '/dashboard',
    },
    {
      name: 'admin',
      icon: faUserSecret,
      url: '/dashboard/admin',
    },
    {
      name: 'customer',
      icon: faUsers,
      url: '/dashboard/customer',
    },
    {
      name: 'order',
      icon: faShoppingBasket,
      url: '/dashboard/order',
    },
  ]

  return (
    <ListGroup className="h-100 rounded-0 bg-info">
      {menus.map((menu, id) => (
        <SidebarItem key={id} menu={menu} />
      ))}
    </ListGroup>
  )
}
