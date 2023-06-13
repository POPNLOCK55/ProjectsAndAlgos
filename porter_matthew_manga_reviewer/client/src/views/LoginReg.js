import React from 'react'
import { Stack } from 'react-bootstrap';
import Register from '../components/Register';
import Login from '../components/Login';


const LoginReg = (props) => {
    const {setLoggedUser} = props;
    return(
        <Stack gap={5}>
        <div className='reg'><Register setLoggedUser = {setLoggedUser}/></div>
        <div><Login setLoggedUser = {setLoggedUser}/></div>
        </Stack>
    )
}

export default LoginReg