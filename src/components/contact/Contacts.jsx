import React, { useState } from 'react';
import './contact.css';
import { SiLinkedin } from "react-icons/si";
import { FaGithub, FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { supabase } from './supabaseClient'; // make sure the path is correct

function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const { error } = await supabase
      .from('contact_messages')
      .insert([formData]);

    if (error) {
      console.error(error);
      setStatus('Failed to send message.');
    } else {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-links">
        <h2>Contact Links</h2>
        <ul className="contact-list">
          <li><a href="https://github.com/anuragchandr" className="contact-link"><FaGithub /> GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/anurag-chandra-a4553a317/" className="contact-link"><SiLinkedin /> LinkedIn</a></li>
          <li><a href="mailto:nrgchandra@gmsil.com" className="contact-link"><FaEnvelope /> Email</a></li>
          <li><a href="tel:+911111111111" className="contact-link"><FaPhone /> Phone</a></li>
          <li><a href="https://www.facebook.com/" className="contact-link"><FaFacebook /> Facebook</a></li>
          <li><a href="https://www.instagram.com/anuragchandra.ec/" className="contact-link"><FaInstagram /> Instagram</a></li>
          <li><a href="https://www.twitter.com/" className="contact-link"><FaTwitter /> Twitter</a></li>
          <li><a href="https://www.youtube.com/@shorts_circuit" className="contact-link"><FaYoutube /> YouTube</a></li>
        </ul>
      </div>

      <div className="contact-form">
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Your Name</label>
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-group">
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="message">Message</label>
          </div>

          <button type="submit" className="animated-button">
            <span>Contact Me</span>
            <span></span>
          </button>

          <p className="form-status">{status}</p>
        </form>
      </div>
    </div>
  );
}

export default Contacts;
