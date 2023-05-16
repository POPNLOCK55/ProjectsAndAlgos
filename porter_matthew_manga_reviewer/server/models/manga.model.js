const mongoose = require("mongoose");



const MangaReviewSchema = new mongoose.Schema({
    reviewCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        // type: String,
        // required: [true],
        // minlength: [3],
    },
    mangaTitle: {
        type: String,
        required: [true, "Manga needs a title!"],
        minlength:[3, "Title must be 3 characters or more!"]
    },
    mangaAuthor: {
        type: String,
        required: [true, "Who wrote this manga?"],
        minlength: [3, "Author name must be 3 characters or more!"]
    },
    rating: {
        type: Number,
        required: [true, "Please give a rating."]
    },
    reviewTitle: {
        type: String,
        required: [false]
    },
    reviewBody: {
        type: String,
        required: [true, "Please tell us your thoughts on this manga."],
        minlength: [10, "Review must have a body."]
    },
}, { timestamps: true })

module.exports = mongoose.model('MangaReview', MangaReviewSchema)

/*/I need to insert the creating user as a key in my model.
How would I dynamically pull the User id based on who is logged in?
Would that be in useState on the front end?/*/
