const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports.authenticate = (request, response, next) => {
    jwt.verify(request.cookies.userToken, process.env.FIRST_SECRET_KEY, (error, payload) => {
        if (error) {
            response.status(401).json({verified: false});
        } else {
            next();
        }
    })
}