import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = ({ setLoggedUser }) => {
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/users")
            .then(response => {
                console.log(response)
            }).catch(err => console.log(err))
    }, [])

    const registrationHandler = (e) => {
        e.preventDefault()
        console.log(newUser)
        axios.post("http://localhost:8000/api/register", {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: newUser.password,
            confirmPassword: newUser.confirmPassword
        }, { withCredentials: true })
            .then(response => {
                console.log("success")
                console.log(response.data)
                setLoggedUser(response.data.user)
                navigate("/home")
            })
            .catch(err => {
                console.log(err.config.data)
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
    const changeHandler = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={(e) => registrationHandler(e)}>
                <div>
                    <h1>Welcome to Manga Reviewer!</h1>
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                    <label htmlFor='firstName'>First Name: </label>
                    <input name='firstName' type='text' value={newUser.firstName} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name: </label>
                    <input name='lastName' type='text' value={newUser.lastName} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='firstName'>E-mail: </label>
                    <input name='email' type='text' value={newUser.email} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input name='password' type='password' value={newUser.password} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password: </label>
                    <input name='confirmPassword' type='password' value={newUser.confirmPassword} onChange={changeHandler} />
                </div>
                <button value="Register" type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register