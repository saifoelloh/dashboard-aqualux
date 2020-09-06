import {
  faBox,
  faHome,
  faShippingFast,
  faShoppingBasket,
  faSitemap,
  faUserSecret,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { ListGroup } from 'reactstrap'
import SidebarItem from 'components/atoms/sidebar-item'

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
      childs: [
        {
          name: 'list order',
          icon: faShoppingBasket,
          url: '/dashboard/order',
        },
        {
          name: 'branch',
          icon: faSitemap,
          url: '/dashboard/branch',
        },
        {
          name: 'package',
          icon: faBox,
          url: '/dashboard/package',
        },
      ],
    },
    {
      name: 'shipping',
      icon: faShippingFast,
      url: '/dashboard/shipping',
    },
  ]

  return (
    <ListGroup className="h-100 rounded-0">
      {menus.map((menu, id) => (
        <SidebarItem key={id} menu={menu} />
      ))}
    </ListGroup>
  )
}
