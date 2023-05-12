import React, { useState } from 'react'
import axios from 'axios';
import Register from '../components/Register';
import Login from '../components/Login';


const LoginReg = (props) => {
    return(
        <div>
            <Register/>
            <Login/>
        </div>
    )
}

export default LoginReg