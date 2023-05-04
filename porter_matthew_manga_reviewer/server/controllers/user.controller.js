const User = require('../models/user.model');

module. exports = {
    createUser: (request, response) => {
        const {firstName, lastName, email, password} = request.body;
        User.create({
            firstName,
            lastName,
            email,
            password
        })
        .then(user => response.json(user))
        .catch(error => response.status(400).json(error));
    },
}