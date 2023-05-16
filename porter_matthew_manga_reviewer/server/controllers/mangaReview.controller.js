const Review = require('../models/manga.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const myFirstKey = process.env.FIRST_SECRET_KEY;
const User = require("../models/user.model")


module.exports = {
    createReview: (request, response) => {
        const user = jwt.verify(request.cookies.userToken, myFirstKey);
        // const {reviewCreator, mangaTitle, rating, mangaAuthor, reviewTitle, reviewBody} = request.body;
        Review.create({ ...request.body, reviewCreator: user.id })
            .then(review => response.status(201).json(review))
            .catch(error => response.status(400).json(error))
    },
    updateReview: (request, response) => {
        Review.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
            .then(updatedReview => response.json(updatedReview))
            .catch(error => response.json(error))
    },
    getAllReviews: (request, response) => {
        Review.find()
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
        Review.findOne({ _id: request.params.id })
            .populate('reviewCreator', 'firstName')
            .then(review => response.json(review))
    },
    getReviewByUser: (request, response) => {
        const user = jwt.verify(request.cookies.userToken, myFirstKey);
        Review.findById({ reviewCreator: user._id })
            .populate('reviewCreator', 'firstName')
            .then(review => {
                console.log(review)
                response.json(review)
            })
    },
    deleteReview: async (request, response) => {
        const deleteReview = await Review.deleteOne({ _id: request.params.id })
        try {
            const userToken = jwt.sign({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            }, myFirstKey)
            response
                .cookie("userToken", userToken, {
                    httpOnly: true
                })
                .json({ msg: "Success!", deletedReview: deleteReview });
        }
        catch (error) {
            console.log("Catch error from backend Delete method", error)
            response.status(400).json({ error: error, msg: "Delete review failed." })
        }
    }
}