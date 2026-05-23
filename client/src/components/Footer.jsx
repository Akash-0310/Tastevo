import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdRestaurantMenu } from 'react-icons/md';
import { FiMapPin, FiPhone, FiMail, FiClock, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
      }
    } catch {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64 C480,150 960,-20 1440,64 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <MdRestaurantMenu />
              <span>Taste<span className="text-accent">vo</span></span>
            </Link>
            <p className="footer__desc">
              Bringing authentic flavours to your table since 2020. Experience the perfect blend
              of traditional recipes and modern culinary artistry. Every dish tells a story.
            </p>
            <div className="footer__social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FiFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FiTwitter /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FiYoutube /></a>
            </div>
          </div>

          <div className="footer__section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/menu">Our Menu</Link>
            <Link to="/about">About Us</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer__section">
            <h4>Menu Categories</h4>
            <Link to="/menu">Starters & Appetizers</Link>
            <Link to="/menu">Main Course</Link>
            <Link to="/menu">Desserts & Sweets</Link>
            <Link to="/menu">Beverages</Link>
            <Link to="/menu">Chef's Special</Link>
            <Link to="/menu">Combo Meals</Link>
          </div>

          <div className="footer__section">
            <h4>Contact Info</h4>
            <div className="footer__contact-item">
              <FiMapPin />
              <span>123 Foodie Street, Koramangala, Bangalore 560034</span>
            </div>
            <div className="footer__contact-item">
              <FiPhone />
              <span>+91 98765 43210</span>
            </div>
            <div className="footer__contact-item">
              <FiMail />
              <span>hello@tastevo.in</span>
            </div>
            <div className="footer__contact-item">
              <FiClock />
              <span>Mon-Sun: 11:00 AM - 11:00 PM</span>
            </div>
          </div>
        </div>

        <div className="footer__newsletter">
          <div className="footer__newsletter-content">
            <h4>Subscribe to Our Newsletter</h4>
            <p>Get exclusive offers, new menu updates, and foodie tips delivered to your inbox.</p>
          </div>
          <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn--primary">
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Tastevo. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
