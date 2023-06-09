const ReviewController = require('../controllers/mangaReview.controller');
const UserController = require('../controllers/user.controller');
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/logged/user', UserController.getLoggedUser);
    app.get('/api/reviews', ReviewController.getAllReviews);
    app.get('/api/reviews/:id', ReviewController.getOneReview);
    app.get('/api/review/:id', ReviewController.getOneReview);
    app.post('/api/logout', UserController.logoutUser);
    app.post('/api/login', UserController.loginUser);
    app.post('/api/register', UserController.registerUser);
    app.post('/api/review', ReviewController.createReview);
    app.put('/api/review/update/:id', ReviewController.updateReview);
    app.delete('/api/review/delete/:id', ReviewController.deleteReview);
}

//How can I relate a review with the user who created it?
//I want to make sure that when I click a button to view a review that it will display it's author as well.