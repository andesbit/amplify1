import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import Users from './pages/Users.js';
import AddUser from './pages/AddUser.js';
import Gallery from './pages/Gallery.js';
import PublicProfile from './pages/PublicProfile.js';
import Inbox from './pages/Inbox.js';
import Terminos from './pages/legal/Terminos.js';
import Privacidad from './pages/legal/Privacidad.js';
import Disclaimer from './pages/legal/Disclaimer.js';

// Dentro de <Routes>:
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/gallery" element={<Gallery />} />
        {/*<Route path="/user/:userId" element={<PublicProfile />} />*/}
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/:userName" element={<PublicProfile />} />  {/* ← AL FINAL */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
