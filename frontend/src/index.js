import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Login from './components/routes/Login.jsx';
import Dashboard from './components/routes/Dashboard.jsx';
import EditProfile from './components/routes/EditProfile.jsx';
import SignOut from './components/routes/SignOut.jsx';
import Profile from './components/routes/Profile.jsx';
import UsernameView from './components/routes/UsernameView.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
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
  document.getElementById("root")
);
reportWebVitals();
