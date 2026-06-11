import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import {
  FiShield, FiEye, FiDatabase, FiLock, FiMail,
  FiSmartphone, FiUsers, FiRefreshCw, FiChevronDown,
} from 'react-icons/fi';
import { BUSINESS_EMAIL } from '../config/constants';

const sections = [
  {
    id: 'information-we-collect',
    icon: <FiDatabase />,
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Information You Provide Directly',
        text: 'When you contact us, place an order via WhatsApp, make a reservation, or subscribe to our newsletter, we collect: your name, phone number, email address, delivery address, and any special requests or dietary preferences you share.',
      },
      {
        subtitle: 'Order Information',
        text: 'When you order through WhatsApp, we collect the details of your order including items ordered, quantities, customisations, delivery address, and payment method preference. This is necessary to fulfil your order.',
      },
      {
        subtitle: 'Automatically Collected Information',
        text: 'When you visit our website, we automatically collect certain information: your device type, browser type, IP address, pages visited, time spent on pages, and referring URLs. This is collected via cookies and similar tracking technologies.',
      },
      {
        subtitle: 'Communications',
        text: 'If you contact us for support, feedback, or queries, we keep records of those communications to help resolve your issues and improve our service.',
      },
    ],
  },
  {
    id: 'how-we-use',
    icon: <FiEye />,
    title: 'How We Use Your Information',
    content: [
      {
        subtitle: 'Order Fulfilment',
        text: 'We use your contact and address information to process and deliver your orders, send order confirmations, provide delivery updates, and handle any issues with your order.',
      },
      {
        subtitle: 'Customer Support',
        text: 'Your contact information and order history help us respond to your queries, resolve complaints, and provide personalised support.',
      },
      {
        subtitle: 'Marketing & Promotions',
        text: 'With your consent, we may send you newsletters, promotional offers, new menu updates, and seasonal specials via WhatsApp, email, or SMS. You can opt out at any time.',
      },
      {
        subtitle: 'Service Improvement',
        text: 'We analyse usage patterns and feedback to improve our menu, delivery speed, website experience, and overall service quality.',
      },
      {
        subtitle: 'Legal & Safety',
        text: 'We may use your information to comply with applicable laws, prevent fraud, resolve disputes, and enforce our terms of service.',
      },
    ],
  },
  {
    id: 'information-sharing',
    icon: <FiUsers />,
    title: 'Information Sharing & Disclosure',
    content: [
      {
        subtitle: 'We Do Not Sell Your Data',
        text: 'Tastevo does not sell, rent, or trade your personal information to third parties for their marketing purposes. Period.',
      },
      {
        subtitle: 'Delivery Partners',
        text: 'To fulfil your orders, we share your name, phone number, and delivery address with our delivery partners. They are bound by confidentiality obligations and may only use this information to complete your delivery.',
      },
      {
        subtitle: 'Service Providers',
        text: 'We work with trusted third-party service providers for payment processing, analytics, email delivery, and cloud infrastructure. These providers access only the data needed to perform their functions and are governed by strict data processing agreements.',
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information if required by law, court order, or governmental authority, or when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.',
      },
    ],
  },
  {
    id: 'data-security',
    icon: <FiLock />,
    title: 'Data Security',
    content: [
      {
        subtitle: 'Security Measures',
        text: 'We implement industry-standard security measures including SSL/TLS encryption for data in transit, encrypted storage for sensitive data, access controls limiting who can view your information, and regular security audits.',
      },
      {
        subtitle: 'Data Retention',
        text: 'We retain your personal data only as long as necessary: order data is kept for 3 years (for warranty and dispute resolution), newsletter subscriptions until you unsubscribe, and analytics data is anonymised after 26 months.',
      },
      {
        subtitle: 'Data Breach Notification',
        text: 'In the unlikely event of a data breach that affects your personal information, we will notify you and the relevant authorities within 72 hours as required by applicable law.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: <FiSmartphone />,
    title: 'Cookies & Tracking',
    content: [
      {
        subtitle: 'What Are Cookies',
        text: 'Cookies are small text files stored on your device when you visit our website. They help us remember your preferences, understand how you use our site, and provide a better experience.',
      },
      {
        subtitle: 'Types of Cookies We Use',
        text: 'Essential cookies (required for the website to function), analytics cookies (to understand how visitors use our site — we use anonymised data only), and preference cookies (to remember your dark/light mode preference and language).',
      },
      {
        subtitle: 'Managing Cookies',
        text: 'You can control cookies through your browser settings. Disabling cookies may affect some features of our website. We do not use cookies for advertising or tracking you across other websites.',
      },
    ],
  },
  {
    id: 'your-rights',
    icon: <FiShield />,
    title: 'Your Rights',
    content: [
      {
        subtitle: 'Access & Portability',
        text: 'You have the right to request a copy of all personal data we hold about you, in a portable, machine-readable format.',
      },
      {
        subtitle: 'Correction',
        text: 'If your information is inaccurate or incomplete, you can request that we correct or update it at any time.',
      },
      {
        subtitle: 'Deletion ("Right to be Forgotten")',
        text: 'You may request that we delete your personal data. We will comply unless we are legally required to retain it (e.g., for tax records or active dispute resolution).',
      },
      {
        subtitle: 'Opt-Out of Marketing',
        text: 'You can unsubscribe from marketing communications at any time by clicking "Unsubscribe" in any email, replying "STOP" to any WhatsApp message, or contacting us directly.',
      },
      {
        subtitle: 'Withdraw Consent',
        text: 'Where we process your data based on consent, you can withdraw that consent at any time without affecting the lawfulness of processing carried out before withdrawal.',
      },
    ],
  },
  {
    id: 'updates',
    icon: <FiRefreshCw />,
    title: 'Policy Updates',
    content: [
      {
        subtitle: 'Changes to This Policy',
        text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of material changes via email or a prominent notice on our website at least 14 days before the change takes effect.',
      },
      {
        subtitle: 'Continued Use',
        text: 'Your continued use of our website and services after any changes to this Privacy Policy constitutes your acceptance of the updated policy. We encourage you to review this page periodically.',
      },
    ],
  },
];

const AccordionItem = ({ section, isOpen, onToggle }) => (
  <div className={`privacy-accordion__item ${isOpen ? 'privacy-accordion__item--open' : ''}`}>
    <button className="privacy-accordion__trigger" onClick={onToggle}>
      <div className="privacy-accordion__icon">{section.icon}</div>
      <h3>{section.title}</h3>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className="privacy-accordion__chevron"
      >
        <FiChevronDown />
      </motion.div>
    </button>
    <motion.div
      className="privacy-accordion__body"
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'hidden' }}
    >
      <div className="privacy-accordion__content">
        {section.content.map((item, i) => (
          <div key={i} className="privacy-accordion__block">
            <h4>{item.subtitle}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

const Privacy = () => {
  const [openSection, setOpenSection] = useState(0);

  return (
    <div className="privacy-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=600&fit=crop"
            alt="Privacy and security"
          />
          <div className="page-hero__overlay"></div>
        </div>
        <div className="container page-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section__badge">Transparency First</span>
            <h1>Privacy Policy</h1>
            <p>We believe you deserve to know exactly how your data is collected, used, and protected. This policy explains it all in plain language.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
              Last updated: June 2025 &nbsp;·&nbsp; Effective: June 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick summary */}
      <section className="privacy-summary section">
        <div className="container">
          <AnimatedSection className="privacy-summary__box">
            <FiShield className="privacy-summary__icon" />
            <div>
              <h2>The Short Version</h2>
              <p>
                Tastevo collects only the information needed to serve you — your name, contact
                details, and order preferences. We <strong>never sell your data</strong>. We use
                it only to fulfil orders, improve our service, and (with your permission) keep you
                updated on new menu items and offers. You can access, correct, or delete your data
                at any time by contacting us at{' '}
                <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Full Policy */}
      <section className="privacy-content section">
        <div className="container">
          <div className="privacy-layout">
            {/* TOC sidebar */}
            <AnimatedSection direction="right" className="privacy-toc">
              <h4>Jump to Section</h4>
              <nav>
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`privacy-toc__link ${openSection === i ? 'privacy-toc__link--active' : ''}`}
                    onClick={(e) => { e.preventDefault(); setOpenSection(i); }}
                  >
                    <span className="privacy-toc__icon">{s.icon}</span>
                    {s.title}
                  </a>
                ))}
              </nav>
            </AnimatedSection>

            {/* Accordion */}
            <div className="privacy-accordion">
              {sections.map((section, i) => (
                <AnimatedSection key={section.id} delay={i * 0.05} id={section.id}>
                  <AccordionItem
                    section={section}
                    isOpen={openSection === i}
                    onToggle={() => setOpenSection(openSection === i ? null : i)}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact for privacy */}
      <section className="privacy-contact section">
        <div className="container">
          <AnimatedSection className="privacy-contact__card">
            <FiMail />
            <div>
              <h2>Privacy Questions?</h2>
              <p>
                If you have any questions about this Privacy Policy, want to exercise your rights,
                or have concerns about how we handle your data, please contact our Privacy Officer:
              </p>
              <div className="privacy-contact__info">
                <p><strong>Email:</strong> <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a></p>
                <p><strong>Subject line:</strong> "Privacy Request — [Your Name]"</p>
                <p><strong>Response time:</strong> Within 48 hours on business days</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <a href={`mailto:${BUSINESS_EMAIL}`} className="btn btn--primary">
                  <FiMail /> Email Us
                </a>
                <Link to="/contact" className="btn btn--outline">
                  Contact Page
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
