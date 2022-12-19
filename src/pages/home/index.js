import React, { useState, useRef} from 'react';
import './styles.css';
import { 
    FormControl, 
    Grid, 
    Input, 
    TextField, 
    IconButton,
    Button,
    SvgIcon,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import WarningIcon from '@material-ui/icons/Warning';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { KeyboardReturn } from '@material-ui/icons';

import axios from 'axios'


const Home = () => {

    const [loginSliderState, setLoginSlider] = useState(false);
    const [accountSliderPosition, setAccountSliderPosition] = useState(null);
    const [formHeight, setFormHeight] = useState(false);
    const [isStudent, setIsStudent] = useState(false);

    const [loginSpinner, setLoginSpinner] = useState(false);
    const [accountSpinner, setAccountSpinner] = useState(false);


    const [loginData, setLoginData] = useState({
        loginEmail: null,
        loginPassword: null
    })
    const [newAccountData, setNewAccountData] = useState({
        email: null,
        password: null,
        confirmPassword: null
    })

    const [loginError, setLoginError] = useState(null)
    const [newAccountError, setNewAccountError] = useState(null)


    const handleSliderClick = (sliderOrigin, back) => {
        if (sliderOrigin === "login"){
            setLoginSlider(!loginSliderState)
        }
    }

    const handleAccountClick = (positionClass, option) => {
        if (option) {
            setFormHeight("form-height")
            if (option == "student") {
                setIsStudent(true)
            } else {
                setIsStudent(false)
            }
            setAccountSliderPosition(positionClass)
        } else {
            setFormHeight(false)
            setAccountSliderPosition(positionClass)

        }
    }

    const handleChange = (e) => {
        let {name, value} = e.target;
        name === "loginEmail" || name === "loginPassword" ? 
        setLoginData({
            ...loginData,
            [name]: value
        })
        : setNewAccountData({
            ...newAccountData,
            [name]: value
        })
    }

    const returnSliderPosition = () => {
        let positionClass
        switch(accountSliderPosition){
            case "2": positionClass = "minus-three-hundred"
        }
        return positionClass
    }

    const loginFunction = (isNewAccount, accountEmail, accountPassword) => {
        if (isNewAccount === undefined) {
            let { loginEmail, loginPassword } = loginData
            axios({
                method: "POST",
                url: '/login',
                data: {
                    email: loginEmail,
                    password: loginPassword
                },
                withCredentials: true
            }).then((res) => {
                if (res.data.loggedIn == true) {
                    window.location = "/choice"
                  }
            })
        } else {
            const loginEmail = accountEmail;
            const loginPassword = accountPassword;
            setTimeout(function(){
                axios({
                    method: "POST",
                    url: '/login',
                    data: {
                        email: loginEmail,
                        password: loginPassword
                    },
                    withCredentials: true
                }).then((res) => {
                    if (res.data.loggedIn == true) {
                        window.location = "/choice"
                      }
                })
            }, 2000);
            
        }

    }
    const checkLoginErrors = async () => {
        let { loginEmail, loginPassword } = loginData
        if (loginEmail == null || loginPassword == null) {
            setLoginError("please fill all fields")
        } else {
            if (loginEmail.includes("@") != true) {
                setLoginError("Email doesn't include '@'")
            }
            // else if (loginEmail.length < 7) {
            //     setLoginError("Email too short, not valid")
            // }
            // else if (loginPassword == null || loginPassword.length < 8) {
            //     setLoginError("Password too short, minimum 8 characters")
            // } 
            else {
                setLoginError(null)
                loginFunction()
                //submit login function HERE
            }
        }
    }
    const checkNewAccountErrors = async () => {
        let { email, password, confirmPassword } = newAccountData
        let errorPresent = false
        if (email == null || password == null || confirmPassword == null) {
            setNewAccountError("please fill all fields")
        } else {
            if (email.includes("@") !== true) {
                setNewAccountError("Email doesn't include '@'")
                
            } else if (email.length < 7) {
                setNewAccountError("Email too short, not valid")
                
            } else if (password.length < 8) {
                setNewAccountError("Password too short, minimum 8 characters")
                
            } else if (password !== confirmPassword) {
                setNewAccountError("Passwords do not match")
            } else {
               setNewAccountError(null)
               let dataCopy = newAccountData
               isStudent ? delete dataCopy.schoolName :  delete dataCopy.schoolCode
               try {
               await axios({
                    method: "PUT",
                    url: "/create-account",
                    data: {
                        ...newAccountData
                    }
                }).then((res) => {

                    // loginFunction(true, email, password)
                })
               } catch (error) {
                setNewAccountError(error.response.data.error)
               }
            }
        }
        setAccountSpinner(false)
    }
    const handleSubmit = (e, type) => {
       if (e === "button" || e.key === "Enter") {
            if (type === "login") {
                setLoginSpinner(true)
                checkLoginErrors()
                
            } else if (type === "create"){
                setAccountSpinner(true)
                checkNewAccountErrors()
                } 
        }
    }

    function myFunction() {
        var x = document.getElementById("login-password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

    const returnInputs = () => {
        
    }



    return (
        <div className="homepage-container">
            <div className="title-holder">
               <div className="home-title">PlayPod</div>
               <div className="home-subtitle">A place for podcasts</div>
            </div>
            <div className={`forms-container ${formHeight == false ? null : "padding-bottom"}`}>
                <div className="login-container sliding-container">
                    <div className={`inner-slider ${loginSliderState ? "minus-three-hundred" : null}`}>
                        <div className="home-button login-button no-select" onClick={() => handleSliderClick("login")}>LOGIN</div>
                        <FormControl className="home-form" onSubmit={() => handleSubmit()} onKeyPress={(e) => handleSubmit(e, "login")}>
                            <div className="account-form-top">
                                <IconButton className="form-close-button" onClick={() => handleSliderClick("login")}>
                                    <ArrowUpwardIcon />
                                </IconButton>
                                <div className="form-type-title">Login</div>
                            </div>

                            <div className="field-holder">
                            {loginError === null ? null
                                :   <div className="error-div">
                                        <WarningIcon className="warning-icon"/>
                                        <div>{loginError}</div>
                                    </div>    
                            }
                            <TextField
                                color="secondary"
                                className="input-field"
                                label="email"
                                variant="filled"
                                name="loginEmail"
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                className="input-field"
                                label="password"
                                color="secondary"
                                variant="filled"
                                name="loginPassword"                            
                                type="password"
                                onChange={(e) => handleChange(e)}
                            />
                            <Button 
                                className="submit-button" 
                                color="primary"
                                variant="contained" 
                                onClick={() => handleSubmit("button", "login")}
                            >
                              {loginSpinner ? <AutorenewIcon className="spinner" /> : <div>Submit</div>}  
                            </Button>
                            </div>
                        </FormControl>
                    </div>
                </div>
                <div className={`create-account-container sliding-container ${formHeight}`}>
                    <div className={`inner-slider ${accountSliderPosition}`}>
                        <div 
                            className={`home-button button create-button no-select`}
                            onClick={() => handleAccountClick("minus-three-hundred")}
                        >CREATE ACCOUNT
                        </div>
                        <div className="student-teacher-button button no-select">
                            <div className="half-button student-button" onClick={() => handleAccountClick("minus-six-hundred", "student")}>Student</div>
                            <div className="half-button" onClick={() => handleAccountClick("minus-six-hundred", "school")}>School</div>
                            <IconButton className="form-close-button student-school-close" onClick={() => handleAccountClick("")}>
                                <ArrowUpwardIcon />
                            </IconButton>
                        </div>
                        <FormControl className='account-form'>
                            <div className="account-form-top">
                                <IconButton className="form-close-button" onClick={() => handleAccountClick("minus-three-hundred")}>
                                    <ArrowUpwardIcon />
                                </IconButton>
                                {
                                    isStudent ? <div className="form-type-title">Student</div> : <div className="form-type-title">School</div>
                                }
                                
                            </div>

                            <div className="field-holder">
                            {newAccountError === null ? null
                                :   <div className="error-div">
                                        <WarningIcon className="warning-icon"/>
                                        <div>{newAccountError}</div>
                                    </div>    
                            }
                            {returnInputs()}
                            {isStudent === false ? null : 
                            <div className="options-container">
                              <TextField
                              className="input-field"
                              label="school code"
                              variant="filled"
                              color="secondary"
                              name="schoolCode"
                              size="small"
                              onChange={(e) => handleChange(e)}
                             />
                              <TextField
                              className="input-field"
                              label="student number"
                              variant="filled"
                              color="secondary"
                              name="studentNumber"
                              size="small"
                              onChange={(e) => handleChange(e)}
                             />
                              <TextField
                              className="input-field"
                              label="username"
                              variant="filled"
                              color="secondary"
                              name="username"
                              size="small"
                              onChange={(e) => handleChange(e)}
                             />
                            </div>
                            }
                            {isStudent ? null : 

                            <div className="options-container">
                                <TextField
                                className="input-field"
                                label="school name"
                                color="secondary"
                                variant="filled"
                                name="schoolName"
                                size="small"
                                onChange={(e) => handleChange(e)}
                                />
                                <TextField
                                className="input-field"
                                label="contact name"
                                color="secondary"
                                variant="filled"
                                name="firstname"
                                size="small"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>
                            }


                            <TextField
                                className="input-field"
                                label={isStudent ? "email" : "contact email"}
                                color="secondary"
                                variant="filled"
                                name="email"
                                size="small"
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                className="input-field"
                                label="password"
                                variant="filled"
                                color="secondary"
                                type="password"
                                name="password"
                                size="small"
                                onChange={(e) => handleChange(e)}
                            />
             
                            <TextField
                                className="input-field"
                                label="confirm password"
                                variant="filled"
                                color="secondary"
                                type="password"
                                name="confirmPassword"
                                size="small"
                                onChange={(e) => handleChange(e)}
                            />
                            <Button 
                                className="submit-button create-submit-button" 
                                color="primary"
                                variant="contained"
                                onClick={(e) => handleSubmit("button", "create")}
                            >
                                {accountSpinner ? <AutorenewIcon className="spinner" /> : <div>Submit</div>}
                            </Button>
                            </div>

                        </FormControl>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Home
