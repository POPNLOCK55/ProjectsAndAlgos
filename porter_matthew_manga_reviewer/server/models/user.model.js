const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {type: String,
    required: [true, "Name must be 3 characters or more!"]},
    lastName: {type: String,
    required: [true, "Last Name must be 3 characters or more!"]},
    email: {type: String,
    required: [true, "A valid E-mail is required!"]},
    password: {type: String,
    required: [true, "A password is required!"]}
}, { timestamps: true})

module.exports = mongoose.model('User', UserSchema);