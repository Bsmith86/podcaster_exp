
/// REACT AND CSS ///
import React, { useContext } from 'react';
import { DashboardContext } from '../../contexts/dashboardContext';
import './index.css'

/// MUI & IMAGES ///
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ForumIcon from '@mui/icons-material/Forum';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Logo from '../../assets/FinalLogo.jpg'

/// COMPONENTS ///
import Menuitem from './menuItem';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate();

    // const categories = ["Math", "English", "Science"]


    const {
      dashboardState, 
      setDashboardState
    } = useContext(DashboardContext)

    const handleClick = (type) => {
        console.log(type)
    }
    const handleIconClick = (string) => {
      switch (string) {
        case "Inicio":    navigate('/')

        break;
        default: console.log("no match")
      }
    }


    const returnButtons = () => {
      return ["Inicio", "Explora", "Foro", "Tienda"].map((string) => {
        return (
          <div className='sidebar-button-container no-select' key={string} onClick={() => handleIconClick(string)}>
            {string === "Inicio" ? <HomeIcon className='sidebar-button' /> : null}
            {string === "Explora" ? <ExploreIcon className='sidebar-button'/> : null}
            {string === "Foro" ? <ForumIcon className='sidebar-button'/> : null}
            {string === "Tienda" ? <ShoppingBagIcon className='sidebar-button'/> : null}
            <div className="sidebar-title">{string}</div>
          </div>
        )
      })
    }

  return (
    <div >
        <ProSidebar className='main-sidebar' >
          <img src={Logo} className='sidebar-logo' alt="company logo - PeerPod"/>
          <div className="buttons-container">
            {returnButtons()}
          </div>
          

        {/* <Menu iconShape="square" >
            <div className='button-container'>
                <Button variant="contained" className='my-button' onClick={() => handleUploadButton()}>
                  {!dashboardState ? "EXPLORE PODCASTS" : "UPLOAD"}
                </Button>
            </div>
            <div className='sidebar-title'>Categories</div>
            {categories.map((cat) => (
                <div onClick={() => handleClick(cat)}>
                <Menuitem title={cat} key={cat+1}/>
                </div>
            ))}
            <div className='sidebar-title'>Favorites</div>

             <SubMenu title="Administration">
              <Menuitem title="Utility Management" />
              <Menuitem title="User Management" />
              <Menuitem title="Region Management" />
            </SubMenu> 
        </Menu> */}
        </ProSidebar>
    </div>
  )
}

export default Sidebar