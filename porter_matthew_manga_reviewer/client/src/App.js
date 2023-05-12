
import './App.css';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import LoginReg from "./views/LoginReg";
import Home from "./components/Home";
import ReviewPage from './components/ReviewPage';



function App() {
  const [users, setUsers] = useState([])
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<LoginReg/>} path='/register' default/>
        <Route element={<Home/>} path='/home' users={users} setUsers={setUsers}/>
        <Route element={<ReviewPage/>} path='/reviews/:id' />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
