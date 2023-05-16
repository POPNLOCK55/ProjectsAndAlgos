const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
        minlength: [3, "First name must be 3 characters or more!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"],
        minlength: [3, "Last name must be 3 characters or more!"]
    },
    email: {
        type: String,
        required: [true, "E-mail is required!"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid E-mail address."
        }
    },
    password: {
        type: String,
        required: [true, "A password is required!"],
        minlength: [8, "Password must be 8 characters or more!"],
    }
}, { timestamps: true })

UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match!')
    }
    next();
});
UserSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        console.log('Hashed password:', hashedPassword)
        this.password = hashedPassword
        next()
    } catch {
        console.log('Error in save', error)
    }
});
module.exports = mongoose.model('User', UserSchema);