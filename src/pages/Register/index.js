/// REACT AND CSS ///
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './index.css'

/// MUI ///
import { Button, Grid, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

/// LIBRARIES ///
import axios from 'axios';


const Register = ({setDefault}) => {
  /// NEED ERROR HANDLING ///
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState([])

  let [userInfo, setUserInfo] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null
  })
  const [first, setFirst] = useState()
  const [last, setLast] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState([])
  const [confirmPassword, setConfirmPassword] = useState([])



  const handleSubmit = () => {
    let { firstName, lastName, email, password } = userInfo
    axios({
      method: "PUT",
      url: "/create-account",
      data: {
        firstName,
        lastName,
        email,
        password
      }
    })
    navigate("/dashboard");
  }

  const returnTextFields = () => {
    let fields = ["firstName", "lastName", "email", "password", "confirmPassword"];

    return fields.map((item) => {
      let label = item;
      if (item === "firstName") {
        label = "First Name";
      } else if (item === "lastName"){
        label = "Last Name"
      } else if (item === "confirmPassword"){
        label = "Confirm Password"
      }
      return (
        <TextField
        style={{marginTop: "12px"}}
        label={label}
        onChange={(e) => setUserInfo({
          ...userInfo,
          [item]: e.target.value
        })}
        value={userInfo[item]}
        variant="outlined"
      />
      )
    })
  }

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
          <h2>Register</h2>
        </div>

        <div className="inputs-container" elevation={3}>
          {errors.length
            ? errors.map((error) => (
                <div key={error} className="errors">
                  {error}
                </div>
              ))
            : null}
          {returnTextFields()}
          <Button
            style={{marginTop: "12px"}}
            variant="contained"
            className="register-button"
            onClick={() => handleSubmit()}
          >
            Register
          </Button>
        </div>
      </Grid>
    </Grid>
 </div>
  );
};

export default Register