import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const CreateReview = ({ loggedUser, setLoggedUser }) => {


    const [newReview, setNewReview] = useState({
        reviewCreator: "",
        mangaTitle: "",
        mangaAuthor: "",
        rating: "",
        reviewTitle: "",
        reviewBody: ""
    })
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams()

    const changeHandler = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value })
    }

    const publishHandler = (e) => {
        e.preventDefault()
        console.log(newReview)
        console.log("logged user:", loggedUser)
        axios.post("http://localhost:8000/api/review", {
            reviewCreator: newReview.reviewCreator,
            mangaTitle: newReview.mangaTitle,
            mangaAuthor: newReview.mangaAuthor,
            rating: newReview.rating,
            reviewTitle: newReview.reviewTitle,
            reviewBody: newReview.reviewBody
        }, { withCredentials: true })
        .then(response => {
                console.log("success")
                console.log(response.data)
                navigate(`/reviews/${response.data._id}`)
            })
            .catch(err => {
                console.log(typeof loggedUser)
                console.log(err.config.data)
                console.log("err is:", err)
                const errorResponse = err.response;
                console.log("error response sends back:", errorResponse)
                const errorArray = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push(errorResponse[key].message)
                }
                setErrors(errorArray)
            })
    }  //for some reason passing in the reviewCreator field is breaking. Get that fixed tomorrow! 5/14
    return (
        <div>
            <form onSubmit={(e) => publishHandler(e)}>
                <div>
                    <h1>Write your own Review!</h1>
                    <Link to={"/home"}>Home</Link>
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                    <label htmlFor='mangaTitle'>Manga Title: </label>
                    <input name='mangaTitle' type='text' value={newReview.mangaTitle} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='mangaAuthor'>Mangaka: </label>
                    <input name='mangaAuthor' type='text' value={newReview.mangaAuthor} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='rating'>Rating: </label>
                    <select name='rating' value={newReview.rating} onChange={changeHandler} >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='reviewTitle'>Title of your Review: </label>
                    <input name='reviewTitle' type='text' value={newReview.reviewTitle} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='reviewBody'>Your thoughts: </label>
                    <textarea name='reviewBody' type='text' value={newReview.reviewBody} onChange={changeHandler} />
                </div>
                <button value="Publish" type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default CreateReview