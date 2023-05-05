import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = (props) => {
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }) 
    const [errors, setErrors] =useState([]);
    const navigate = useNavigate();

    const registrationHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/register", {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log("success")
            console.log(response.data)
            navigate("/home")
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            console.log("error response is:", errorResponse)
            const errorArray = [];
            for (const key of Object.keys(errorResponse)) {
                errorArray.push(errorResponse[key].message)
            }
            setErrors(errorArray)
        })
    }
    const changeHandler = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={registrationHandler}>
            {errors.map((error, index) => <p key={index}>{error}</p>)}
                <div>
                <label htmlFor='firstName'>First Name: </label>
                <input name='firstName' type='text' onChange={changeHandler} />
                </div>
                <div>
                <label htmlFor='lastName'>Last Name: </label>
                <input name='lastName' type='text' onChange={changeHandler} />
                </div>
                <div>
                <label htmlFor='firstName'>E-mail: </label>
                <input name='email' type='text' onChange={changeHandler} />
                </div>
                <div>
                <label htmlFor='password'>Password: </label>
                <input name='password' type='password' onChange={changeHandler} />
                </div>
                <div>
                <label htmlFor='confPass'>Confirm Password: </label>
                <input name='confPass' type='password' onChange={changeHandler} />
                <input type="submit" value="Register"/>
                </div>
            </form>
        </div>
    )
}

export default Register