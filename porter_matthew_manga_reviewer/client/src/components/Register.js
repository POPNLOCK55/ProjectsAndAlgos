import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';

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
        <Container fluid={'xxl'}>
            <h1>Welcome to Manga Reviewer!</h1>
            <Form onSubmit={(e) => registrationHandler(e)}>
                <InputGroup size='lg' className='mb-3' controlId='regFirstName' >
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                    <InputGroup.Text htmlFor='firstName'>First Name: </InputGroup.Text>
                    <Form.Control
                        name='firstName'
                        type='text'
                        placeholder='ex: John'
                        value={newUser.firstName}
                        onChange={changeHandler} />
                </InputGroup>
                <InputGroup size='lg' className='mb-3' controlId='regLastName' >
                    <InputGroup.Text htmlFor='lastName'>Last Name: </InputGroup.Text>
                    <Form.Control
                        name='lastName'
                        type='text'
                        placeholder='ex: Doe'
                        value={newUser.lastName}
                        onChange={changeHandler} />
                </InputGroup>
                <InputGroup size='lg' className='mb-3' controlId='regEmail' >
                    <InputGroup.Text htmlFor='email'>E-mail: </InputGroup.Text>
                    <Form.Control
                        name='email'
                        type='text' placeholder='ex: 123@abc.net'
                        value={newUser.email}
                        onChange={changeHandler} />
                </InputGroup>
                <InputGroup size='lg' className='mb-3' controlId='regPass' >
                    <InputGroup.Text htmlFor='password'>Password: </InputGroup.Text>
                    <Form.Control
                        name='password'
                        type='password' placeholder='Password here!'
                        value={newUser.password}
                        onChange={changeHandler} />
                </InputGroup>
                <InputGroup size='lg' className='mb-3' controlId='regConPass'>
                    <InputGroup.Text htmlFor='confirmPassword'>Confirm Password: </InputGroup.Text>
                    <Form.Control
                        name='confirmPassword'
                        type='password' placeholder='Do it again!'
                        value={newUser.confirmPassword}
                        onChange={changeHandler} />
                </InputGroup>
                <Button size='lg' variant='primary' value="Register" type='submit'>Register</Button>
            </Form>
        </Container>
    )
}

export default Register