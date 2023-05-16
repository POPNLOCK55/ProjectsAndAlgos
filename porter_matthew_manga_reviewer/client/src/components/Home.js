import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';




const Home = ({loggedUser, setLoggedUser}) => {

    const [allUsers, setAllUsers] = useState([])
    const [allReviews, setAllReviews] = useState([])
    const navigate = useNavigate()

    // const removeReviewFromDOM = reviewId => {
    //     setAllReviews(allReviews.filter(review => review._id !== reviewId));
    // }

    // const deleteReview = (reviewId) => {
    //     axios.delete('http://localhost:8000/api/review/delete/' + reviewId,
    //     {withCredentials: true})
    //     .then(response => {
    //         console.log("attempting to delete review...")
    //         removeReviewFromDOM(reviewId)
    //         console.log("Review successfully deleted!", response)
    //     })
    //     .catch(error => console.log("Here's the error:", error))
    // }


    useEffect(() => {
        axios.get("http://localhost:8000/api/reviews")
            .then(response => {
                console.log(response)
                setAllReviews(response.data)
            }).catch(err => console.log(err))
    }, [])


    return (
        <div>
            <h1>Welcome!</h1>
            <Link to={"/review/create"}>Write a Review!</Link>
            {allReviews.map((review, index) => {
                return <div key={index}>
                    <h2>{review.reviewTitle}</h2>
                    <Link to={`/reviews/${review._id}`}>Read full review</Link>
                    <p>Reviewed Manga: {review.mangaTitle}</p>
                    <p>Score: {review.rating}</p>
                    <p>Reviewed by: {review.reviewCreator?.firstName}</p>
                    <Link to={`/review/edit/${review._id}`}>Edit Review</Link>
                    {/* <button onClick={(e) => deleteReview(review._id)}>Delete Review</button> */}
                </div>
            })}
        </div>
    )
}
export default Home

