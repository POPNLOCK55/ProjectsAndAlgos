const Review = require('../models/manga.model');

module.exports = {
    createReview: (request, response) => {
        const {title, rating, reviewTitle, reviewBody} = request.body;
        Review.create({
            title,
            rating,
            reviewTitle,
            reviewBody
        })
        .then(review => response.json(review))
        .catch(error => response.status(400).json(error))
    },
}