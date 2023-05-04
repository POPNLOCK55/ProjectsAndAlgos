const mongoose = require("mongoose");

const MangaReviewSchema = new mongoose.Schema({
    title: {type: String, 
    required: [true, "Manga needs a title!"]},
    rating: {type: Number,
    required: [true, "Please give a rating."]},
    reviewTitle: {type: String,
    required: [false]},
    reviewBody: {type: String,
    required: [true, "Please tell us your thoughts on this manga."]}
}, {timestamps: true})

module.exports = mongoose.model('MangaReview', MangaReviewSchema)