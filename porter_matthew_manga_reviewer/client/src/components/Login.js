import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';

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
        <Container fluid={'xxl'}>
            <Form onSubmit={(e) => loginHandler(e)}>
                <h2>Login</h2>
                {errors.map((error, index) => <p key={index}>{error}</p>)}
                <InputGroup size='lg' className='mb-3' controlId='loginEmail' >
                    <InputGroup.Text htmlFor='email'>E-mail: </InputGroup.Text>
                    <Form.Control
                        type='email'
                        name='email'
                        placeholder='Enter your E-mail...'
                        value={logUser.email}
                        onChange={changeHandler} />
                </InputGroup>
                <InputGroup size='lg' className='mb-3' controlId='loginPassword'>
                    <InputGroup.Text htmlFor='password'>Password: </InputGroup.Text>
                    <Form.Control type='password' placeholder='Enter your Password...' name='password' value={logUser.password} onChange={changeHandler} />
                </InputGroup>
                <Button size='lg' variant='primary' type='submit'>Login</Button>
            </Form>
        </Container>
    )
}
export default Login