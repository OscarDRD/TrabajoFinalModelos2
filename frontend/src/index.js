import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Login from './components/routes/Login.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Slider from './components/Slider.jsx';
ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>} />
    
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
reportWebVitals();
