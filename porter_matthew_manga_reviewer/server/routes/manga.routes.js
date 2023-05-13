const ReviewController = require('../controllers/mangaReview.controller');
const UserController = require('../controllers/user.controller');
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/reviews', ReviewController.getAllReviews);
    app.get('/api/reviews/:id', ReviewController.getOneReview);
    app.post('/api/logout', UserController.logoutUser);
    // app.put('/api/reviews/:id', ReviewController.updateReview)
    app.post('/api/login', UserController.loginUser);
    app.post('/api/register', UserController.registerUser);
    app.post('/api/review', ReviewController.createReview);
}

//How can I relate a review with the user who created it?
//I want to make sure that when I click a button to view a review that it will display it's author as well.