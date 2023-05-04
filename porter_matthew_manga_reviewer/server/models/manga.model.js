const mongoose = require("mongoose");


const MangaReviewSchema = new mongoose.Schema({
    ReviewCreator: [],
    Mangatitle: {type: String, 
    required: [true, "Manga needs a title!"]},
    Mangaauthor: {type: String,
    required: [true, "Who wrote this manga?"]},
    rating: {type: Number,
    required: [true, "Please give a rating."]},
    reviewTitle: {type: String,
    required: [false]},
    reviewBody: {type: String,
    required: [true, "Please tell us your thoughts on this manga."]}
}, {timestamps: true})

module.exports = mongoose.model('MangaReview', MangaReviewSchema)

/*/I need to insert the creating user as a key in my model.
How would I dynamically pull the User id based on who is logged in?
Would that be in useState on the front end?/*/
