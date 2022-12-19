/// REACT AND CSS ///
import React, { useState, useEffect, useContext } from 'react';
import './styles.css'


/// MUI ///
import { IconButton, MenuList } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';


import userImg from '../../assets/user_img.png'
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts'
import axios from 'axios'
// import SearchBar from "material-ui-search-bar";
import AccountMenu from '../accountMenu'

const Navbar = () => {

    let [navbarState, setNavbar] = useState(true)
    let location = useLocation()

    let { user, signOut } = useContext(UserContext);


    useEffect(() => {
        if (location.pathname === "/dashboard") {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }, [location])

    const handleAccountClick = () => {
        let menu = document.getElementById('account-menu-container');
        menu.style.display === "none" ? menu.style.display = "block" : menu.style.display = "none";
    }
    const handleClick = () => {
        axios({
            method: "GET",
            url: "get_one"
        }).then((res) => {
            console.log(res)
        })
    }

    const handleButtonsClick = () => {
        console.log(user)
    }
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));
      
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
    
    return (
        <div className='navbar-container'>
            {/* <SearchBar
            // value={searchbar}
            className="searchbar"
            // onChange={(newValue) => setSearchbar(newValue)}
            // onRequestSearch={() => handleSearch()}
            /> */}
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            <div className="end-buttons-container">
                <IconButton>
                    <NotificationsIcon className='notification-button'/>
                </IconButton>
                <div className="account-container">
                <img src={userImg} id="user-img" alt="image of user" onClick={() => handleAccountClick()} />
                <AccountMenu />
                </div>

            </div>
        </div>
    )
}
export default Navbar
