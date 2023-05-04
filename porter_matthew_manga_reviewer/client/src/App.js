
import './App.css';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import Register from "./components/Register";
import Home from "./components/Home";



function App() {
  const [user, setUser] = useState({})
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <BrowserRouter>
      <Routes>
        <Route element={<Register/>} path='/register' default/>
        <Route element={<Home/>} path='/home'/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
