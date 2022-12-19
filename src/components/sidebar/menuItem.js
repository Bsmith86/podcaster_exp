import React, {useContext} from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


const Menuitem = ({title}) => {



  const handleClick = (item) => {

  }

  return (
    <MenuItem className="no-select" onClick={() => handleClick(title)}>{title}</MenuItem>

  )
}

export default Menuitem