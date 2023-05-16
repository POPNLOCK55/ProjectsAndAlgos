import React, { useState } from 'react'
import axios from 'axios';
import Register from '../components/Register';
import Login from '../components/Login';


const LoginReg = (props) => {
    const {setLoggedUser} = props;
    return(
        <div>
            <Register setLoggedUser = {setLoggedUser}/>
            <Login setLoggedUser = {setLoggedUser}/>
        </div>
    )
}

export default LoginReg