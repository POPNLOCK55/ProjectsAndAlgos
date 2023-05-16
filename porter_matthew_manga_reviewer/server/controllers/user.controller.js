const bcrypt = require('bcrypt')
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

const myFirstKey = process.env.FIRST_SECRET_KEY;
// require('dotenv').config();


module.exports = {
    registerUser: async (request, response) => {
        try {
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
        catch (error) {
            console.log("Catch error from registerUser", error)
            response.status(400).json({ error: error, msg: "Registration failed." })
        }
    },
    loginUser: async (request, response) => {
        const user = await User.findOne({ email: request.body.email });
        if (user === null) {
            return response.sendStatus(400);
        }
        try{
            const realPassword = await bcrypt.compare(request.body.password, user.password);
            if (!realPassword) {
                return response.sendStatus(400);
            }else {
                const userToken = jwt.sign({
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName
                }, myFirstKey)
                response
                    .status(200)
                    .cookie("userToken", userToken, {
                        httpOnly: true
                    })
                    .json({ msg: "Success!", user: user })
            }}
        catch (error){
            console.log("error from login controller:", error)
            response.status(400).json({error: error})
        }
    },
    logoutUser: (request, response) => {
        console.log("Logging out...")
        response.clearCookie('userToken');
        response.json({successMessage: "User logged out."})
    },
    getLoggedUser: async (request, response) => {
        try {
            const user = jwt.verify(request.cookies.userToken, myFirstKey);
            const loggedUser = await User.findOne({ _id: user._id });
            response.json(loggedUser)
        } catch (error) {
            response.status(400).json({ errors: 'failed to get logged in user' })
        }
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