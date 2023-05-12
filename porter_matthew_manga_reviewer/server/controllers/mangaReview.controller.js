const Review = require('../models/manga.model');
const User = require("../models/user.model")
module.exports = {
    createReview: (request, response) => {
        const {mangaTitle, rating, mangaAuthor, reviewTitle, reviewBody} = request.body;
        Review.create({
            mangaTitle,
            mangaAuthor,
            rating,
            reviewTitle,
            reviewBody
        })
        .then(review => response.json(review))
        .catch(error => response.status(400).json(error))
    },
    getAllReviews: (request, response) => {
        Review.find({})
        .then(reviews => {
            console.log(reviews)
            response.json(reviews)
        })
        .catch(error => {
            console.log(error)
            response.json(error)
        })
    },
    getOneReview: (request, response) => {
        Review.findOne({_id: request.params.id})
        .then(review => response.json(review))
    },
    getReviewByUser: (request, response) => {
        Review.findById({_id: request.User.params.id})
        .then(review => {
            console.log(review)
            response.json(review)
        })
    },
}