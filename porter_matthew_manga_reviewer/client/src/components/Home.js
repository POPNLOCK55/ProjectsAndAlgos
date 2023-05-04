import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = (props) => {
    const {user, setUser} = props;

    return(
        <div>
            <h1>Welcome, {user.firstName}</h1>
        </div>
    )
}
export default Home

/*/ Registration is not working atm
Get that fixed tomorrow./*/