import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import VantaBg from './components/VantaBg';
import Projects from './Projects';
import Home from './Home';
import About from './components/about/About.jsx';
import Contacts from './components/contact/Contacts';
import ComingSoon from './components/blogs/ComingSoon.jsx';

function AppContent() {
  return (
    <>
      <Navbar />
      <VantaBg />
      <div className="home-container">
        <Home />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/projects" element={
          <>
            <Navbar />
            <VantaBg />
            <div>
              <Projects />
            </div>
          </>
          
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <VantaBg />
            <div className="home-container">
              <About />
            </div>
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <VantaBg />
            <div className="home-container">
              <Contacts/>
            </div>
          </>
        } />
        <Route path="/blogs" element={
          <>
            <Navbar />
            <VantaBg />
            <div className="home-container">
             <ComingSoon/>
            </div>
          </>
        } />
        <Route path="/resume" element={

          <>
            <Navbar />
            <VantaBg />
            <div className="home-container">
              <Home />
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
