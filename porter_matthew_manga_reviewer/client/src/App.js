
import './App.css';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import LoginReg from "./views/LoginReg";
import Home from "./components/Home";
import ReviewPage from './components/ReviewPage';
import CreateReview from './components/CreateReview';
import EditReview from './components/EditReview';
import TopBar from './components/TopBar';



function App() {
  const [loggedUser, setLoggedUser] = useState({})
  return (
    <div className="App">
      <TopBar loggedUser = {loggedUser} setLoggedUser={setLoggedUser}/>
      <BrowserRouter>
      <Routes>
        <Route element={<LoginReg  setLoggedUser = {setLoggedUser}/>} path='/' default/>
        <Route element={<Home loggedUser = {loggedUser} setLoggedUser={setLoggedUser}/>} path='/home'/>
        <Route element={<ReviewPage  loggedUser = {loggedUser} setLoggedUser={setLoggedUser}/>} path='/reviews/:id' />
        <Route element={<CreateReview  loggedUser = {loggedUser} setLoggedUser={setLoggedUser}/>} path='/review/create' />
        <Route element={<EditReview  loggedUser = {loggedUser} setLoggedUser={setLoggedUser}/>} path='/review/edit/:id' />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
