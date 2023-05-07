const ReviewController = require('../controllers/mangaReview.controller');
const UserController = require('../controllers/user.controller');
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
    app.get('/api/users', authenticate, UserController.getAllUsers);
    app.get('/api/reviews', authenticate, ReviewController.getAllReviews);
    app.get('/api/reviews/:id', authenticate, ReviewController.getOneReview);
    app.post('/api/login', UserController.getOneUser);
    app.post('/api/register', UserController.registerUser);
    app.post('/api/review', authenticate, ReviewController.createReview);
}

//How can I relate a review with the user who created it?
//I want to make sure that when I click a button to view a review that it will display it's author as well.