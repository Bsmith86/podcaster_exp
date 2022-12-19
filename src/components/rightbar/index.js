/// REACT & CSS ///
import React, {useContext} from 'react';
import './styles.css';

/// MUI ///
import MicIcon from '@mui/icons-material/Mic';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import { useNavigate } from 'react-router-dom'


import { DashboardContext } from '../../contexts'
const RightBar = () => {
  const navigate = useNavigate();

  let {
    dashboardState,
    setDashboardState
  } = useContext(DashboardContext);

  const handleIconClick = (string) => {

    switch (string) {
      case "Mi Estudio": setDashboardState(false);
      navigate('/upload')
      break;
      default: console.log("no match")
    }

    // if(string === "Mi Estudio") setDashboardState(true);
  }

  const returnButtons = () => {
    return ["Mi Estudio", "Mi centro", "Mi libreria"].map((string) => {
      return (
        <div className='sidebar-button-container no-select' key={string} onClick={() => handleIconClick(string)}>
          {string === "Mi Estudio" ? <MicIcon className='sidebar-button' /> : null}
          {string === "Mi centro" ? <AccountBalanceIcon className='sidebar-button'/> : null}
          {string === "Mi libreria" ? <FolderSpecialIcon className='sidebar-button'/> : null}
          <div className="sidebar-title">{string}</div>
        </div>
      )
    })
  }

  return (
    <div className='rightbar-container'>
      <div className='rightbar-positioned'>
        <div className="buttons-container">
              {returnButtons()}
        </div>
      </div>
    </div>
  )
}

export default RightBar