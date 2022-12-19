/// REACT AND CSS ///
import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts';
import './index.css'

/// MUI ///
import { Button, Grid, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

/// LIBRARIES ///
import axios from 'axios';


const Login = ({setDefault}) => {
  /// NEED ERROR HANDLING ///

  const [errors, setErrors] = useState([])
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])

  let { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const putUserInContext = () => {
    axios({
      method: "GET",
      url: "/get-user",
    }).then((res) => {
      setUser(res.data.user)
      navigate("/dashboard")
    })
  }

  const handleSubmit = () => {
    axios({
      method: "POST",
      url: "/login",
      withCredentials: true,
      data: {
        email,
        password
      }
    }).then((res) => {
      putUserInContext(res.data.user);
    })
  }

  // useEffect(() => {
  //   setEmail("w@w")
  //   setPassword("w")
  // }, [])

  // useEffect(() => {
  //   handleSubmit()
  // }, [password])

  return (
    <div className="mini-form-container">
      <Grid
      className="grid-container"
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item className='inner-container'>
      <div className='mini-title'>
          <IconButton className='arrow-icon-button' onClick={() => setDefault()}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <h2>Login</h2>
        </div>
        <div className="inputs-container" elevation={3}>
          {errors.length
            ? errors.map((error) => (
                <div key={error} className="errors">
                  {error}
                </div>
              ))
            : null}
          <TextField
            className="input email"
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="outlined"
          />
          <TextField
            className="input password"
            label="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            variant="outlined"
          />
          <Button
            variant="contained"
            className="register-button"
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        </div>
      </Grid>
    </Grid>
 </div>
  )
}

export default Login