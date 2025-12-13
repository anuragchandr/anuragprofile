import React, { useEffect } from 'react';
import './styles/App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import VantaBg from './components/VantaBg';
import Projects from './Projects';
import Home from './Home';
import About from './components/about/About.jsx';
import Contacts from './components/contact/Contacts';
import ComingSoon from './components/blogs/ComingSoon.jsx';
import Admin from './components/admin/Admin.jsx';
import Currencyconvertor from './components/miniprojects/Currencyconvertor.jsx';

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
    <BrowserRouter>
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
        <Route path='/projects/currency-convertor' element={
          <>
            <Navbar />
            <div className="home-container">
              <Currencyconvertor />
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
        <Route path="/admin" element={
          <>
            <Navbar />
            <VantaBg />
            <div className="home-container">
              <Admin/>
            </div>
          </>
        } />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
