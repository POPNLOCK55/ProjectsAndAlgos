const { response } = require('express');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
    registerUser: (request, response) => {
        console.log(request.body)
        console.log(process.env.FIRST_SECRET_KEY)

        User.create(request.body)
        .then(user => {
        console.log("Entered then")

            const userToken = jwt.sign({
                id: user._id
            }, process.env.FIRST_SECRET_KEY);
            console.log(userToken)
            response
                .cookie("userToken", userToken, {
                    httpOnly: true
                })
                .json({msg: "Success!", user: user});
        })
        .catch(error => response.json({error: error, msg: "Code was bungus."}))
    },
    loginUser: async(request, response) => {
        const user = await User.findOne({ email: request.body.email });
        if(user === null) {
            return response.sendStatus(400);
        }
        const realPassword = await bcrypt.compare(req.body.password, user.password);
        if(!realPassword) {
            return response.sendStatus(400);
        }
        const userToken = jwt.sign({
            id: user._id
        }, process.env.FIRST_SECRET_KEY)
    response
        .cookie("userToken", userToken, {
            httpOnly: true
        })
        .json({msg: "Success!"})
    },
    logoutUser: (request, response) => {
        response.clearCookie('userToken');
        response.sendStatus(200);
    },
    getOneUser: (request, response) => {
        User.findOne({_id: request.params.id})
        .then(user => response.json(user))
        .catch(error => response.json(error))
    },
    getAllUsers: (request, response) => {
        User.find({})
        .then(users => response.json(users))
    },
}