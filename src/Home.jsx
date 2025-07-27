import React from 'react';
import './styles/home-style.css';
import SplineEmbed from './components/SplinEmbed';
import Animatedbtn from './components/Animatedbtn';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-spline">
        <div style={{ transform: 'scale(0.7)', transformOrigin: 'top left', left: '-20px' }}>
          <SplineEmbed />
        </div>
      </div>

      <div className="home-text">
        <p id="title-text">🌟 Hi, my name is</p>
        <p id="name-text">Anurag Chandra</p>
        <p id="sub-title">Aspiring Engineer <br />& <br />Creative Developer</p>
        <p id="home-about">
          I build sleek, responsive web interfaces and explore intelligent systems—merging design, logic, and curiosity to create digital experiences that grow with me.
        </p>
        <div className="buttons">
          
            <Link to="/contact" className="button-link">
            <button class="animated-button">
              <span class="button-text">Contact Me</span>
              <span class="button-icon">
              </span>
            </button>
              
            </Link>
          <Link to="/projects" className="button-link">
            <Animatedbtn />
          </Link>
        </div>
      </div>

    </div>

  );
}

export default Home;
