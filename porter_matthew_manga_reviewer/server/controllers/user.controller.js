const User = require('../models/user.model');

module. exports = {
    registerUser: (request, response) => {
        User.create(request.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);
            response
                .cookie("userToken", userToken, {
                    httpOnly: true
                })
                .json({msg: "Success!", user: user});
        })
        .catch(error => response.json(error))
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
        }, process.env.SECRET_KEY)
    response
        .cookie("userToken", userToken, {
            httpOnly: true
        })
        .json({msg: "Success!"})
    },
    logoutUser: (request, response) => {
        response.clearCookie('usertoken');
        response.sendStatus(200);
    },
    getOneUser: (request, response) => {
        User.findOne({_id: request.params.id})
        .then(user => response.json(user))
        .catch(error => response.json(error))
    },
}