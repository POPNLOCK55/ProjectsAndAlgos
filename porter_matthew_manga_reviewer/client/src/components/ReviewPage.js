import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const ReviewPage = (props) => {
    const {id} = useParams();

    const [review, setReview] = useState({
        mangaTitle: "",
        mangaAuthor: "",
        rating: "",
        reviewTitle: "",
        reviewBody: ""
    })
        useEffect(() => {
        axios.get("http://localhost:8000/api/reviews/" + id,
        {withCredentials: true})
        .then(response => {
            console.log(response.data)
            setReview(response.data)
        })
        .catch(err => console.log(err))
    }, [])
    return(
        <div>
            <div>
            <h1>{review.reviewTitle}</h1>
            </div>
            <h2>{review.rating}/10</h2>
            <div>
                <p>Mangaka: {review.mangaAuthor}</p>
                <p>Title of Work: {review.mangaTitle}</p>
                <p>Reviewed by: Username here</p>
            </div>
            <div>
                <p>{review.reviewBody}</p>
            </div>
        </div>
    )
}
export default ReviewPage