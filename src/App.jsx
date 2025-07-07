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

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = location.pathname === "/projects" ? "auto" : "hidden";
  }, [location.pathname]);

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
        <Route path="/about" element={<AppContent />} />
        <Route path="/contact" element={<AppContent />} />
        <Route path="/blog" element={<AppContent />} />
        <Route path="/resume" element={<AppContent />} />
        <Route path="/gallery" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
