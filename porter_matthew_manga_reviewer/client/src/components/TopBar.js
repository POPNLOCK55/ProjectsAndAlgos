import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const TopBar = ({loggedUser, setLoggedUser}) => {

    useEffect(() => {
        axios.get('http://localhost:8000/api/logged/user',
            { withCredentials: true })
            .then(response => {
                console.log("Logged user:", response)
                setLoggedUser(response.data)
            }).catch(error => {
                console.log("user error:", error)
                setLoggedUser({})
            })
    }, [])

    const logoutUser = (e) => {
        axios.post("http://localhost:8000/api/logout",
            { withCredentials: true })
            .then(response => {
                console.log("successfully logged out!")
                console.log(response.data)
                setLoggedUser({})
            })
            .catch(err => {
                console.log(err.config.data)
                console.log("err is:", err)
            })
    }



    return (
        <nav>
            {(loggedUser && loggedUser.firstName) ? loggedUser.firstName : "You're not logged in..."}
            <a href='/home'>
                Home
            </a>
            {(loggedUser && loggedUser.firstName) ?
                <>
                    <a href="/register" onClick={(e) => logoutUser(e)}>
                        Logout
                    </a>
                </>
                :
                <a href="/register">
                    Login
                </a>
            }
        </nav>
    )
}

export default TopBar