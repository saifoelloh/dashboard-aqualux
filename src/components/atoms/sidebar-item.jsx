import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListGroupItem } from 'reactstrap'
import { useLocation, Link as RouterLink } from 'react-router-dom'

export default ({ menu }) => {
  const location = useLocation()
  const [menuState, setMenuState] = useState({
    ...menu,
    isHovered: false,
    isActive: false,
  })

  const handleChange = (name, value) => {
    const newMenu = { ...menuState }
    newMenu[name] = value
    setMenuState({ ...newMenu })
  }

  return (
    <ListGroupItem
      tag={RouterLink}
      to={menuState.url}
      active={menuState.isHovered}
      disabled={location.pathname === menuState.url}
      className="rounded-0 text-capitalize"
      onMouseEnter={() => handleChange('isHovered', !menuState.isHovered)}
      onMouseLeave={() => handleChange('isHovered', !menuState.isHovered)}
      action
    >
      <FontAwesomeIcon icon={menuState.icon} className="mr-3" />
      {menuState.name}
    </ListGroupItem>
  )
}
