// import * as React from 'react';
import React, { useContext } from 'react';

import { UserContext } from '../../contexts'

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './index.css'



export default function IconMenu() {

    let { user, signOut } = useContext(UserContext);

  return (
    <Paper sx={{ width: 320}} id="account-menu-container">
      <MenuList>
        <MenuItem  className="account-menu-item">
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Account</ListItemText>
        </MenuItem>
        <MenuItem onClick={signOut} className="account-menu-item">
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}