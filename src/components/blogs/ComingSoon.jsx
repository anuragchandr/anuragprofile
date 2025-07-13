import { useEffect, useState } from 'react';
import './ComingSoon.css';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const launchDate = new Date('2025-10-01T00:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div className="coming-soon-container">
      {/* Animated background elements */}
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>
      <div className="bg-blob-3"></div>
      
      <div className="glass-card">
        <h1 className="title">Something Amazing is Coming</h1>
        <p className="subtitle">My new portfolio feature will launch soon</p>
        
        <div className="countdown">
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
        
        <form className="notify-form">
          <input 
            type="email" 
            placeholder="Get notified when it's ready" 
            className="email-input"
          />
          <button type="submit" className="notify-button">
            Notify Me
          </button>
        </form>
        
        <div className="social-links">
          <a href="#" className="social-link" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-link" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="social-link" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" className="social-link" aria-label="Dribbble">
            <i className="fab fa-dribbble"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;