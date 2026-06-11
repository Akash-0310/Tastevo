import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck, FiAlertCircle, FiCalendar, FiHelpCircle, FiShoppingCart, FiBriefcase } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappUrl, BUSINESS_PHONE, BUSINESS_EMAIL, BUSINESS_ADDRESS, BUSINESS_HOURS } from '../config/constants';

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const reasons = [
  { icon: <FiShoppingCart />, title: 'Orders & Delivery', desc: 'Track your order, report an issue, or request a refund.' },
  { icon: <FiCalendar />,     title: 'Reservations',     desc: 'Book a table, plan a private dining event, or modify a booking.' },
  { icon: <FiBriefcase />,    title: 'Catering & Events', desc: 'Get a custom quote for corporate lunches, parties, or weddings.' },
  { icon: <FiHelpCircle />,   title: 'General Queries',  desc: 'Menu details, allergen info, or anything else on your mind.' },
];

const hours = [
  { day: 'Monday – Friday',  open: '11:00 AM',  close: '11:00 PM', peak: '12–2 PM, 7–10 PM' },
  { day: 'Saturday',         open: '10:00 AM',  close: '11:30 PM', peak: '1–3 PM, 7–10:30 PM' },
  { day: 'Sunday',           open: '10:00 AM',  close: '10:30 PM', peak: '1–4 PM, 7–10 PM' },
];

const Contact = () => {
  const [formData,     setFormData]     = useState({ name: '', email: '', phone: '', message: '' });
  const [reserveData,  setReserveData]  = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' });
  const [status,       setStatus]       = useState('');   // '' | 'sending' | 'success' | 'error'
  const [statusMsg,    setStatusMsg]    = useState('');
  const [reserveStatus,setReserveStatus]= useState('');
  const [reserveMsg,   setReserveMsg]   = useState('');
  const [activeTab,    setActiveTab]    = useState('contact');

  const handleContact = async (e) => {
    e.preventDefault();
    setStatusMsg('');

    // Frontend validation
    if (!isValidEmail(formData.email)) {
      setStatus('error');
      setStatusMsg('Please enter a valid email address.');
      return;
    }
    if (formData.message.trim().length < 10) {
      setStatus('error');
      setStatusMsg('Message must be at least 10 characters.');
      return;
    }

    setStatus('sending');
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setStatusMsg('');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        setStatusMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMsg('Network error. Please check your connection and try again.');
    }
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    setReserveMsg('');

    // Frontend validation
    if (reserveData.email && !isValidEmail(reserveData.email)) {
      setReserveStatus('error');
      setReserveMsg('Please enter a valid email address.');
      return;
    }

    setReserveStatus('sending');
    try {
      const res  = await fetch('/api/reserve', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(reserveData),
      });
      const data = await res.json();
      if (data.success) {
        setReserveStatus('success');
        setReserveMsg('');
        setReserveData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' });
        setTimeout(() => setReserveStatus(''), 5000);
      } else {
        setReserveStatus('error');
        setReserveMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setReserveStatus('error');
      setReserveMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1600&h=600&fit=crop"
            alt="Restaurant interior"
          />
          <div className="page-hero__overlay"></div>
        </div>
        <div className="container page-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section__badge">Get in Touch</span>
            <h1>Contact Us</h1>
            <p>Have a question, feedback, or want to book a table? We'd love to hear from you. Reach out through any channel below.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info section">
        <div className="container">
          <div className="contact-info__grid">
            {[
              { icon: <FiMapPin />, title: 'Visit Us',       lines: [BUSINESS_ADDRESS] },
              { icon: <FiPhone />,  title: 'Call Us',        lines: [BUSINESS_PHONE]   },
              { icon: <FiMail />,   title: 'Email Us',       lines: [BUSINESS_EMAIL]   },
              { icon: <FiClock />,  title: 'Working Hours',  lines: [BUSINESS_HOURS]   },
            ].map((info, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div className="contact-info__card" whileHover={{ y: -5 }}>
                  <div className="contact-info__icon">{info.icon}</div>
                  <h3>{info.title}</h3>
                  {info.lines.map((line, j) => <p key={j}>{line}</p>)}
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons to Contact */}
      <section className="contact-reasons section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge">How Can We Help?</span>
            <h2 className="section__title">Reach Out for Anything</h2>
          </AnimatedSection>
          <div className="contact-reasons__grid">
            {reasons.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div className="contact-reasons__card" whileHover={{ y: -6 }}>
                  <div className="contact-reasons__icon">{r.icon}</div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Hours Breakdown */}
      <section className="contact-hours section">
        <div className="container">
          <AnimatedSection>
            <div className="contact-hours__card">
              <div className="contact-hours__header">
                <FiClock />
                <h2>Operating Hours</h2>
              </div>
              <div className="contact-hours__table">
                {hours.map((h, i) => (
                  <div key={i} className="contact-hours__row">
                    <span className="contact-hours__day">{h.day}</span>
                    <span className="contact-hours__time">{h.open} – {h.close}</span>
                    <span className="contact-hours__peak">Peak: {h.peak}</span>
                  </div>
                ))}
              </div>
              <p className="contact-hours__note">
                WhatsApp orders and support available during all operating hours.
                For urgent issues outside hours, message us — we check periodically.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Form Section */}
      <section className="contact-form-section section">
        <div className="container">
          <div className="contact-form__wrapper">
            <AnimatedSection direction="right" className="contact-form__left">
              <h2>Let's Connect</h2>
              <p>
                Whether you want to share feedback about your dining experience,
                inquire about catering for your next event, or just say hello — we're
                all ears. Our team typically responds within 2 hours during business hours.
              </p>

              <div className="contact-form__whatsapp">
                <h3>Prefer WhatsApp?</h3>
                <p>Get instant responses on WhatsApp for orders, reservations, and queries.</p>
                <a
                  href={whatsappUrl('Hi! I have a query')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--whatsapp"
                >
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
              </div>

              <div className="contact-form__map">
                <iframe
                  title="Tastevo Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965637498997!2d77.6147!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA2LjciTiA3N8KwMzYnNTMuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" className="contact-form__right">
              <div className="contact-form__tabs">
                <button
                  className={`contact-form__tab ${activeTab === 'contact' ? 'contact-form__tab--active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  Send Message
                </button>
                <button
                  className={`contact-form__tab ${activeTab === 'reserve' ? 'contact-form__tab--active' : ''}`}
                  onClick={() => setActiveTab('reserve')}
                >
                  Book a Table
                </button>
              </div>

              {activeTab === 'contact' ? (
                <form className="contact-form" onSubmit={handleContact}>
                  <div className="contact-form__group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="contact-form__group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div className="contact-form__group">
                    <label>Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn--primary btn--lg contact-form__submit"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending…' : status === 'success' ? <><FiCheck /> Sent!</> : <><FiSend /> Send Message</>}
                  </button>
                  {status === 'success' && (
                    <p className="contact-form__success"><FiCheck /> Thank you! We'll get back to you soon.</p>
                  )}
                  {status === 'error' && statusMsg && (
                    <p className="contact-form__error" style={{ color: 'var(--color-error, #e53e3e)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem' }}>
                      <FiAlertCircle /> {statusMsg}
                    </p>
                  )}
                </form>
              ) : (
                <form className="contact-form" onSubmit={handleReservation}>
                  <div className="contact-form__group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={reserveData.name}
                      onChange={(e) => setReserveData({ ...reserveData, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={reserveData.email}
                        onChange={(e) => setReserveData({ ...reserveData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="contact-form__group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        value={reserveData.phone}
                        onChange={(e) => setReserveData({ ...reserveData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label>Date *</label>
                      <input
                        type="date"
                        value={reserveData.date}
                        onChange={(e) => setReserveData({ ...reserveData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="contact-form__group">
                      <label>Time *</label>
                      <input
                        type="time"
                        value={reserveData.time}
                        onChange={(e) => setReserveData({ ...reserveData, time: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label>Guests *</label>
                      <select
                        value={reserveData.guests}
                        onChange={(e) => setReserveData({ ...reserveData, guests: e.target.value })}
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                        <option value="10+">10+ (Large Party)</option>
                      </select>
                    </div>
                    <div className="contact-form__group">
                      <label>Special Requests</label>
                      <input
                        type="text"
                        value={reserveData.notes}
                        onChange={(e) => setReserveData({ ...reserveData, notes: e.target.value })}
                        placeholder="Birthday, anniversary..."
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn--primary btn--lg contact-form__submit"
                    disabled={reserveStatus === 'sending'}
                  >
                    {reserveStatus === 'sending' ? 'Booking…' : reserveStatus === 'success' ? <><FiCheck /> Confirmed!</> : 'Book Table'}
                  </button>
                  {reserveStatus === 'success' && (
                    <p className="contact-form__success"><FiCheck /> Reservation confirmed! We look forward to serving you.</p>
                  )}
                  {reserveStatus === 'error' && reserveMsg && (
                    <p className="contact-form__error" style={{ color: 'var(--color-error, #e53e3e)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem' }}>
                      <FiAlertCircle /> {reserveMsg}
                    </p>
                  )}
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
