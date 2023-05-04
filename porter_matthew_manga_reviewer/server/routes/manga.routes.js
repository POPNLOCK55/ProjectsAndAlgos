const ReviewController = require('../controllers/mangaReview.controller');
const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/register', UserController.createUser);
}