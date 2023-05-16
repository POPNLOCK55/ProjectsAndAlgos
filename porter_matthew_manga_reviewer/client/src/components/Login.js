import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = ({ setLoggedUser }) => {

    const [logUser, setLogUser] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setLogUser({ ...logUser, [e.target.name]: e.target.value })
    }

    const loginHandler = (e) => {
        e.preventDefault()
        console.log(logUser)
        axios.post("http://localhost:8000/api/login", {
            email: logUser.email,
            password: logUser.password
        }, { withCredentials: true })
            .then(response => {
                console.log("user successfully logged in.")
                console.log(response)
                setLoggedUser(response.data.user)
                console.log("under set user")
                navigate("/home")
            })
            .catch(err => {
                // console.log(err.config.data)
                console.log("err is:", err)
                const errorResponse = err.response;
                console.log("error response sends back:", errorResponse)
                const errorArray = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push(errorResponse[key].message)
                }
                setErrors(errorArray)
            })
    }


    return (
        <div>
            <h2>Login</h2>
            {errors.map((error, index) => <p key={index}>{error}</p>)}
            <form onSubmit={(e) => loginHandler(e)}>
                <div>
                    <label htmlFor='email'>E-mail: </label>
                    <input type='text' name='email' value={logUser.email} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' name='password' value={logUser.password} onChange={changeHandler} />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
export default Login