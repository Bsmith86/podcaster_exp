/// LIBRARIES & CSS ///
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './styles.css'

/// IMAGES ///
import playpodImg from '../../assets/Logo.jpg'
import NewUser from '../../assets/NewUser.jpg'
import LoginImg from '../../assets/Login.jpg'


/// COMPONENTS ///
import Register from '../Register'
import Login from '../Login'

const ChoicePage = () => {

    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url: "/getme"
    //     }).then((res) => {
    //         console.log(res)
    //     })
    // }, [])

    const [state, setState] = useState('default');


    const returnContent = () => {
        let content;

        switch(state) {
            case "register": content = <Register setDefault={() => setState('default')}/>;
            break;

            case "login": content = <Login setDefault={() => setState('default')}/>;
            break;

            default: content = (
                <div>
                    <div className="choice-title">Join your peers!</div>
                    <div className="choices-container">
                        <div className='button-img-container' onClick={() => setState('register')}>
                            <img className="button-img" src={NewUser}  alt="register button"/>
                        </div>
                        <div className='button-img-container' onClick={() => setState('login')}>
                            <img className="button-img" src={LoginImg} alt="login button"/>
                        </div>
                    </div>
                </div>
            );
        }
        return content;
    }


    return (
        <div className="choice-page-container">
            <img className="title-img" src={playpodImg} alt="company logo - Peerpod"/>
            {returnContent()}
        </div>
    )
}

export default ChoicePage;