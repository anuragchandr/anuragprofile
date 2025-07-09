import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
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

            <li>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "navlink active" : "navlink"}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? "navlink active" : "navlink"}
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? "navlink active" : "navlink"}
              >
                Contact
              </NavLink>
            </li>


            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => isActive ? "navlink active" : "navlink"}
              >
                Projects
              </NavLink>
            </li>

          </ul>
        </nav>

        <div className="blogs">
          <NavLink
            to="/blogs"
            className={({ isActive }) => isActive ? "navlink active" : "navlink"}
          >
            Blogs
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
