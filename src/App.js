import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Profile from './pages/Profile.js';
import Users from './pages/Users.js';
import AddUser from './pages/AddUser.js';
import Gallery from './pages/Gallery.js';
import PublicProfile from './pages/PublicProfile.js';
import Inbox from './pages/Inbox.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/user/:userId" element={<PublicProfile />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </Router>
  );
}

export default App;
