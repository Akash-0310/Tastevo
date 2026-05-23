import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdRestaurantMenu } from 'react-icons/md';
import { FiMapPin, FiPhone, FiMail, FiClock, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import { BUSINESS_PHONE, BUSINESS_EMAIL, BUSINESS_ADDRESS, BUSINESS_HOURS } from '../config/constants';

const Footer = () => {
  const [email, setEmail]           = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError]     = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubError('');

    // Basic email format check before hitting the server
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubError('Please enter a valid email address.');
      return;
    }

    try {
      const res  = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 4000);
      } else {
        setSubError(data.error || 'Subscription failed. Please try again.');
      }
    } catch {
      setSubError('Network error. Please check your connection and try again.');
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
              Authentic flavours, crafted with care. Browse our digital menu,
              discover handcrafted dishes made from fresh ingredients, and order
              instantly via WhatsApp. Every dish tells a story.
            </p>
            <div className="footer__social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
              <a href="https://facebook.com"  target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FiFacebook /></a>
              <a href="https://twitter.com"   target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FiTwitter /></a>
              <a href="https://youtube.com"   target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FiYoutube /></a>
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
            <Link to="/menu">Starters &amp; Appetizers</Link>
            <Link to="/menu">Main Course</Link>
            <Link to="/menu">Desserts &amp; Sweets</Link>
            <Link to="/menu">Beverages</Link>
            <Link to="/menu">Chef's Special</Link>
            <Link to="/menu">Combo Meals</Link>
          </div>

          <div className="footer__section">
            <h4>Contact Info</h4>
            <div className="footer__contact-item">
              <FiMapPin />
              <span>{BUSINESS_ADDRESS}</span>
            </div>
            <div className="footer__contact-item">
              <FiPhone />
              <span>{BUSINESS_PHONE}</span>
            </div>
            <div className="footer__contact-item">
              <FiMail />
              <span>{BUSINESS_EMAIL}</span>
            </div>
            <div className="footer__contact-item">
              <FiClock />
              <span>{BUSINESS_HOURS}</span>
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
              onChange={(e) => { setEmail(e.target.value); setSubError(''); }}
              required
              aria-label="Email for newsletter"
            />
            <button type="submit" className="btn btn--primary">
              {subscribed ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {subError && (
            <p style={{ color: 'var(--color-error, #e53e3e)', marginTop: '0.5rem', fontSize: '0.875rem' }}>
              {subError}
            </p>
          )}
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Tastevo. All rights reserved.</p>
          <div className="footer__bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
