import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const EditReview = ({loggedUser, setLoggedUser}) => {
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const [reviewEdit, setReviewEdit] = useState({
        reviewCreator: '',
        mangaTitle: '',
        mangaAuthor: '',
        rating: '',
        reviewTitle: '',
        reviewBody: ''
    })

    useEffect(() => {
        axios.get('http://localhost:8000/api/reviews/' + id,
            { withCredentials: true })
            .then(response => {
                console.log('Response sends:', response.data)
                setReviewEdit(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    const changeHandler = (e) => {
        setReviewEdit({ ...reviewEdit, [e.target.name]: e.target.value })
    }

    const updateHandler = (e) => {
        e.preventDefault()
        console.log(reviewEdit)
        axios.put("http://localhost:8000/api/review/update/" + reviewEdit._id, {
            // reviewCreator: newReview.reviewCreator,
            mangaTitle: reviewEdit.mangaTitle,
            mangaAuthor: reviewEdit.mangaAuthor,
            rating: reviewEdit.rating,
            reviewTitle: reviewEdit.reviewTitle,
            reviewBody: reviewEdit.reviewBody
        }, { withCredentials: true })
            .then(response => {
                console.log("success")
                console.log(response.data)
                navigate(`/reviews/${response.data._id}`)
            })
            .catch(err => {
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
    }
    return (
        <div>
            <form onSubmit={(e) => updateHandler(e)}>
                <div>
                    <h1>Edit your Review!</h1>
                    <Link to={"/home"}>Home</Link>
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                    <label htmlFor='mangaTitle'>Manga Title: </label>
                    <input placeholder={reviewEdit.mangaTitle} name='mangaTitle' type='text' value={reviewEdit.mangaTitle} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='mangaAuthor'>Mangaka: </label>
                    <input value={reviewEdit.mangaAuthor} name='mangaAuthor' type='text'onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='rating'>Rating: </label>
                    <select placeholder={reviewEdit.rating} name='rating' value={reviewEdit.rating} onChange={changeHandler} >
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
                    <input name='reviewTitle' type='text' value={reviewEdit.reviewTitle} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='reviewBody'>Your thoughts: </label>
                    <textarea name='reviewBody' type='text' value={reviewEdit.reviewBody} onChange={changeHandler} />
                </div>
                <button value="Update" type='submit'>Update</button>
            </form>
        </div>
    )
}

export default EditReview