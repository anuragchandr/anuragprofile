// src/Projects.jsx
import React from 'react';
import './styles/projects.css';
import DecryptedText from './components/DecryptedText';
import './styles/ShinyText.css';
import Cards from './components/Card';

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
            <img src="https://img.icons8.com/?size=100&id=58356&format=png&color=000000" alt="icon" className='icons'/>
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
            <img src="https://img.icons8.com/?size=100&id=58356&format=png&color=000000" alt="icon" className='icons'/>
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
        </div>

        <div className="project-list">
          <div className="project-list-title">
            <img src="https://img.icons8.com/?size=100&id=58356&format=png&color=000000" alt="icon" className='icons'/>
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
        </div>
    </div>
  );
}

export default Projects;
