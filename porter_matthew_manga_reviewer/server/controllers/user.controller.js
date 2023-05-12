const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const myFirstKey = process.env.FIRST_SECRET_KEY;


module.exports = {
    registerUser: async (request, response) => {
        try{
        console.log(request.body)
        console.log(myFirstKey)
        const newUser = await User.create(request.body)
                console.log("New user registered", newUser)
                const userToken = jwt.sign({ _id: newUser._id }, myFirstKey);
                console.log(userToken)
                response
                    .status(201)
                    .cookie("userToken", userToken, {
                        httpOnly: true
                    })
                    .json({ msg: "Success!", user: newUser });
                }
            catch(error){
                console.log("Catch error from registerUser", error)
                response.status(400).json({ error: error, msg: "Registration failed." })}
    },
    loginUser: async (request, response) => {
        const user = await User.findOne({ email: request.body.email });
        if (user === null) {
            return response.sendStatus(400);
        }
        const realPassword = await bcrypt.compare(request.body.password, user.password);
        if (!realPassword) {
            return response.sendStatus(400);
        }
        const userToken = jwt.sign({
            id: user._id
        }, myFirstKey)
        response
            .cookie("userToken", userToken, {
                httpOnly: true
            })
            .json({ msg: "Success!" })
    },
    logoutUser: (request, response) => {
        response.clearCookie('userToken');
        response.sendStatus(200);
    },
    getOneUser: (request, response) => {
        User.findOne({ _id: request.params.id })
            .then(user => response.json(user))
            .catch(error => response.json(error))
    },
    getAllUsers: (request, response) => {
        User.find({})
            .then(users => response.json(users))
    },
}