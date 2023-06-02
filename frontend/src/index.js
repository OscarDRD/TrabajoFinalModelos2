import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Login from '../src/routes/Login.jsx';
import Dashboard from '../src/routes/Dashboard.jsx';
import EditProfile from '../src/routes/EditProfile.jsx';
import SignOut from '../src/routes/SignOut.jsx';
import Profile from '../src/routes/Profile.jsx';
import UsernameView from '../src/routes/UsernameView.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="dashboard/profile" element={<EditProfile />} />
      <Route path="signout" element={<SignOut />} />
      <Route path="u/:username" element={<Profile />} />
      <Route path="choose-username" element={<UsernameView />} />
    </Routes>
  </BrowserRouter>,
);
reportWebVitals();
