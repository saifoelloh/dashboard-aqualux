import React, { Fragment, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse, ListGroupItem } from 'reactstrap'
import { useLocation, Link as RouterLink } from 'react-router-dom'

const SidebarItem = ({ menu }) => {
  const location = useLocation()
  const [menuState, setMenuState] = useState({
    ...menu,
    isClick: true,
    isHovered: false,
    isActive: false,
  })

  const handleChange = (name, value) => {
    const newMenu = { ...menuState }
    newMenu[name] = value
    setMenuState({ ...newMenu })
  }

  return menu?.childs !== undefined ? (
    <Fragment>
      <ListGroupItem
        active={menuState.isHovered}
        className="rounded-0 text-capitalize"
        onClick={() => handleChange('isClick', !menuState.isClick)}
        onMouseEnter={() => handleChange('isHovered', !menuState.isHovered)}
        onMouseLeave={() => handleChange('isHovered', !menuState.isHovered)}
        action
      >
        <FontAwesomeIcon icon={menuState.icon} className="mr-3" />
        {menuState.name}
      </ListGroupItem>
      <ListGroupItem className="py-0 pr-0 border-0">
        <Collapse isOpen={!menuState.isClick} className="border-0">
          {menu.childs.map((submenu, id) => (
            <SidebarItem key={id} menu={submenu} />
          ))}
        </Collapse>
      </ListGroupItem>
    </Fragment>
  ) : (
    <ListGroupItem
      tag={RouterLink}
      to={menuState.url}
      active={menuState.isHovered}
      disabled={location.pathname === menuState.url}
      className="rounded-0 text-capitalize"
      onClick={() => handleChange('isClick', !menuState.isClick)}
      onMouseEnter={() => handleChange('isHovered', !menuState.isHovered)}
      onMouseLeave={() => handleChange('isHovered', !menuState.isHovered)}
      action
    >
      <FontAwesomeIcon icon={menuState.icon} className="mr-3" />
      {menuState.name}
    </ListGroupItem>
  )
}

export default SidebarItem
