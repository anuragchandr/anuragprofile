import React from 'react';
import './styles/home-style.css';
import SplineEmbed from './components/SplinEmbed';
import Animatedbtn from './components/Animatedbtn';
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
          <button class="animated-button">
            <span>Contact Me</span>
            <span></span>
          </button>
          <Animatedbtn />
        </div>
      </div>

    </div>

  );
}

export default Home;
