// src/Projects.jsx
import React from 'react';
import './styles/projects.css';
import DecryptedText from './components/DecryptedText';
import './styles/ShinyText.css';
import Cards from './components/Card';

import Cards2 from './components/Card2';

import Cards3 from './components/Card3';


const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};


function Projects() {
  return (
    <div className="projects-container">
        <p className='project-title'>Projects</p>

        <ShinyText text="These are some of my recent work" disabled={false} speed={3} className='custom-class' />

        <div className="project-list">
          <div className="project-list-title">
            <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-craft-sewing-flaticons-lineal-color-flat-icons-2.png" alt="icon" className='icons'/>
            <h2 id='craft'>CRAFT</h2>
            <div style={{ marginTop: '4.3rem', fontSize: '0.8rem', textAlign: 'left' , marginLeft: '-6.5rem'}}>
            
            <DecryptedText
              text="Showcasing Skills"
              animateOn="view"
              speed={100}
              maxIterations={20}
              characters="ABCD1234!?"
              className="revealed"
              parentClassName="all-letters"
              encryptedClassName="encrypted"
              revealDirection="center"
            />
            </div>
            
          </div>
          <Cards/>
        </div>

        <div className="project-list">
          <div className="project-list-title">
            <img src="https://img.icons8.com/?size=100&id=jDmeSqkHdfRV&format=png&color=000000" alt="icon" className='icons'/>
            <h2 id='craft'>IMPACT</h2>
            <div style={{ marginTop: '4.3rem', fontSize: '0.8rem', textAlign: 'left' , marginLeft: '-8.5rem'}}>
            
            <DecryptedText
              text="Making a Difference with real world solutions"
              animateOn="view"
              speed={100}
              maxIterations={20}
              characters="ABCD1234!?"
              className="revealed"
              parentClassName="all-letters"
              encryptedClassName="encrypted"
              revealDirection="center"
            />
            </div>
          </div>
          <Cards2/>
        </div>

        <div className="project-list">
          <div className="project-list-title">
            <img src="https://img.icons8.com/?size=100&id=58356&format=png&color=000000" alt="icon" className='icons'/>
            <h2 id='craft'>SPARK</h2>
            <div style={{ marginTop: '4.3rem', fontSize: '0.8rem', textAlign: 'left' , marginLeft: '-6.5rem'}}>
            
            <DecryptedText
              text="Igniting Ideas with help of AI"
              animateOn="view"
              speed={100}
              maxIterations={20}
              characters="ABCD1234!?"
              className="revealed"
              parentClassName="all-letters"
              encryptedClassName="encrypted"
              revealDirection="center"
            />
            </div>
          </div>
          <Cards3/>
        </div>
    </div>
  );
}

export default Projects;
