const Review = require('../models/manga.model');
const jwt = require('jsonwebtoken');
const myFirstKey = process.env.FIRST_SECRET_KEY;
const User = require("../models/user.model")


module.exports = {
    createReview: (request, response) => {
        const user = jwt.verify(req.cookies.userToken, myFirstKey);
        // const {reviewCreator, mangaTitle, rating, mangaAuthor, reviewTitle, reviewBody} = request.body;
        Review.create({...request.body, reviewCreator: user})
        .then(review => response.status(201).json(review))
        .catch(error => response.status(400).json(error))
    },
    getAllReviews: (request, response) => {
        Review.find({})
        .populate('reviewCreator', 'firstName')
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