import React from 'react';
import './index.css';
import Navbar from '../../components/navbar';
import RightBar from '../../components/rightbar'

 const LoggedInRoute = ({Component, ...rest}) => {
    const handlePageClick = () => {
      let menu = document.getElementById('account-menu-container');
        menu.style.display ="none"
    }
    return(
        <div id="loggedin-inner-container" onClick={(() => handlePageClick())}>
            <div className="component-container">
                <Component />
                <RightBar />
            </div>
        </div>
    )};

export default LoggedInRoute
