import React, { useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
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
        <Navbar expand="lg" bg='primary' variant='dark'>
            <Container>
            {(loggedUser && loggedUser.firstName) ? loggedUser.firstName : "You're not logged in..."}
            <Navbar.Brand href='/home'>
                MangaReviewer
            </Navbar.Brand>
            {(loggedUser && loggedUser.firstName) ?
                <Nav className='me-auto'>
                    <Nav.Link href="/home">
                        Go Home
                    </Nav.Link>
                    <Nav.Link href="/register" onClick={(e) => logoutUser(e)}>
                        Logout
                    </Nav.Link>
                </Nav>
                    :
                    <Nav.Link href="/register">
                        Login
                    </Nav.Link>
                }
            </Container>
        </Navbar>
    )
}

export default TopBar