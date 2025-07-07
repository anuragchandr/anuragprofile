import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
  return (
    <div>
      <div id="vanta-bg" ></div>

      <div className="navbar">
        <div className="logo-container">
          <div className="logo-box">
            <span className="logo-letter">A</span>
          </div>
          <span className="logo-name">Anurag Chandra</span>
        </div>
        <nav>
          <ul className="nav-links">
            <li className="selected"><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="#">skills</a></li>
            <li><a href="#">Projects</a></li>
          </ul>
        </nav>
        <div className="blogs">
          <a href="/blogs">blogs</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
