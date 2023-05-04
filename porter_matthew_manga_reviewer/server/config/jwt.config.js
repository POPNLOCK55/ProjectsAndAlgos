const jwt = require('jsonwebtoken');
const secret = "Sons of Sparda"
module.exports.secret = secret;
module.exports.authenticate = (request, response, next) => {
    jwt.verify(req.cookies.userToken, secret, (error, payload) => {
        if (error) {
            response.status(401).json({verified: false});
        } else {
            next();
        }
    })
}