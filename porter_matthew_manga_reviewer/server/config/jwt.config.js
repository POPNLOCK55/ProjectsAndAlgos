const jwt = require('jsonwebtoken');
const Secret = process.env.FIRST_SECRET_KEY


module.exports.authenticate = (request, response, next) => {
    jwt.verify(request.cookies.userToken, Secret, (error, payload) => {
        if (error) {
            response.status(401).json({verified: false});
        } else {
            request.Token = payload 
            next();
        }
    })
}