import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { FiChevronDown, FiSearch, FiShoppingCart, FiTruck, FiPhone, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappUrl, BUSINESS_PHONE } from '../config/constants';

const faqCategories = {
  'Ordering & Delivery': [
    {
      q: 'How do I place an order?',
      a: `You can place an order in three simple ways: (1) Scan our QR code to browse the menu and tap the WhatsApp order button on any dish. (2) Browse our menu on this website and click "Order via WhatsApp". (3) Message us directly on WhatsApp at ${BUSINESS_PHONE}. Our team will confirm your order and provide an estimated delivery time.`,
    },
    {
      q: 'What are your delivery areas and charges?',
      a: 'We currently deliver within a 10 km radius of our outlets in Koramangala, Indiranagar, and HSR Layout, Bangalore. Delivery is FREE for orders above ₹299. For orders below ₹299, a flat ₹40 delivery charge applies. We are expanding to more areas soon!',
    },
    {
      q: 'How long does delivery take?',
      a: 'Our standard delivery time is 25-35 minutes from order confirmation. During peak hours (12-2 PM and 7-9:30 PM), delivery may take up to 45 minutes. We also offer express 15-minute delivery for select items within a 3 km radius (additional ₹30 charge).',
    },
    {
      q: 'Can I schedule an order in advance?',
      a: 'Yes! You can schedule orders up to 3 days in advance through WhatsApp. Just mention your preferred delivery date and time when placing the order. This is especially popular for office lunches and party orders.',
    },
    {
      q: 'What if I need to cancel or modify my order?',
      a: 'You can cancel or modify your order within 5 minutes of placing it by messaging us on WhatsApp. After the kitchen starts preparing your food, we cannot accept cancellations, but we can try to accommodate modifications based on preparation stage.',
    },
    {
      q: 'Do you offer contactless delivery?',
      a: 'Absolutely! All our deliveries are contactless by default. The delivery partner will place your order at your door, ring the bell, and step back. You can also add specific instructions for delivery in your WhatsApp order.',
    },
  ],
  'Menu & Food': [
    {
      q: 'Do you cater to dietary restrictions?',
      a: 'Yes! Our menu clearly marks vegetarian (green badge) and non-vegetarian (red badge) items. We also accommodate Jain food requirements, gluten-free options, and can adjust spice levels. Please mention any allergies or dietary needs in your WhatsApp order.',
    },
    {
      q: 'How do you ensure food quality and hygiene?',
      a: 'We maintain the highest standards: FSSAI-certified kitchen, daily health checks for all staff, regular third-party audits, temperature-controlled storage, and sealed tamper-proof packaging. All ingredients are sourced fresh daily from verified suppliers.',
    },
    {
      q: 'Are your prices inclusive of taxes?',
      a: 'All prices shown on the menu are inclusive of GST (5%). What you see is what you pay — no hidden charges. Packaging charges, if any, are clearly mentioned during order confirmation on WhatsApp.',
    },
    {
      q: 'Do you use MSG or artificial colours?',
      a: 'No. We take pride in using 100% natural ingredients. Our flavours come from fresh spices, herbs, and traditional cooking techniques — never from artificial additives, preservatives, or MSG.',
    },
    {
      q: 'Can I customise my order (less spicy, extra gravy, etc.)?',
      a: 'Of course! We love making food the way you like it. Simply mention your preferences when ordering on WhatsApp: spice level (mild/medium/hot), extra portions, no onion/garlic (Jain), or any other customisation.',
    },
  ],
  'Payment & Pricing': [
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all popular payment methods: UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery. For WhatsApp orders, we send a UPI payment link after order confirmation.',
    },
    {
      q: 'Do you offer any discounts or loyalty programs?',
      a: 'Yes! First-time customers get 20% off (use code WELCOME20). We also have a loyalty program — every 10th order gets a free dessert. Follow us on Instagram for flash sales and weekend specials.',
    },
    {
      q: 'Do you offer bulk or corporate order discounts?',
      a: 'Absolutely! For orders of 20+ meals, we offer tiered discounts (10-25% off). We also have monthly subscription plans for offices. Contact us on WhatsApp or email orders@tastevo.in for a custom quote.',
    },
  ],
  'Digital Menu & QR Code': [
    {
      q: 'How does the QR code menu work?',
      a: 'Simply point your smartphone camera at our QR code (available on tables, standees, and visiting cards). It opens our digital menu in your browser — no app download needed. Browse items, see photos and prices, and tap to order directly via WhatsApp.',
    },
    {
      q: 'Do I need to download an app to use the digital menu?',
      a: 'No app needed! Our digital menu works entirely in your web browser. It works on any smartphone (iPhone, Android, or even basic phones with internet). Just scan the QR code or visit our website.',
    },
    {
      q: 'Can I get a QR code for my table?',
      a: 'For dine-in customers, every table has a QR code standee. For takeaway or home use, you can bookmark our menu page on your phone or save a screenshot of the QR code from our website.',
    },
    {
      q: 'Is the digital menu accessible for people with disabilities?',
      a: 'Yes, our menu is designed with accessibility in mind: screen reader compatible, high contrast options (dark mode), adjustable text sizes in your browser, and clear categorisation for easy navigation.',
    },
  ],
  'Catering & Events': [
    {
      q: 'Do you provide catering services?',
      a: 'Yes! We cater for events of all sizes — from intimate birthday dinners (10 people) to large corporate events (500+). Our catering menu includes buffet options, live counters, and customised thali services. Contact us at least 3 days in advance.',
    },
    {
      q: 'Can I book the restaurant for a private event?',
      a: 'Our Koramangala outlet has a private dining area that seats up to 40 guests. For exclusive use of the full restaurant (100+ capacity), we accept bookings for Sunday afternoons and weekday evenings. Call us for availability and pricing.',
    },
  ],
};

const popularQuestions = [
  { icon: <FiShoppingCart />, label: 'How do I place an order?',       cat: 'Ordering & Delivery' },
  { icon: <FiTruck />,        label: 'What are the delivery charges?',  cat: 'Ordering & Delivery' },
  { icon: <FiPhone />,        label: 'What payment methods do you accept?', cat: 'Payment & Pricing' },
  { icon: <FiMessageCircle />,label: 'Can I customise my order?',       cat: 'Menu & Food' },
];

const supportStats = [
  { value: '< 2 hrs',  label: 'Avg. response time' },
  { value: '7 days',   label: 'Support availability' },
  { value: '98%',      label: 'Issues resolved' },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} onClick={onClick}>
    <div className="faq-item__question">
      <h3>{question}</h3>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FiChevronDown />
      </motion.div>
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="faq-item__answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState(Object.keys(faqCategories)[0]);
  const [search, setSearch] = useState('');

  const getFilteredFAQs = () => {
    if (!search) return faqCategories[activeCategory];
    const all = [];
    Object.values(faqCategories).forEach(faqs => {
      faqs.forEach(faq => {
        if (
          faq.q.toLowerCase().includes(search.toLowerCase()) ||
          faq.a.toLowerCase().includes(search.toLowerCase())
        ) {
          all.push(faq);
        }
      });
    });
    return all;
  };

  const filteredFAQs = getFilteredFAQs();

  return (
    <div className="faq-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=600&fit=crop"
            alt="Restaurant"
          />
          <div className="page-hero__overlay"></div>
        </div>
        <div className="container page-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section__badge">Help Center</span>
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about ordering, delivery, our menu, and more. Can't find what you need? Reach out to us anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="faq-popular section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge">Most Asked</span>
            <h2 className="section__title">Popular Questions</h2>
          </AnimatedSection>
          <div className="faq-popular__grid">
            {popularQuestions.map((pq, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <motion.button
                  className="faq-popular__card"
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    /* scroll to FAQ section handled below */
                  }}
                >
                  <div className="faq-popular__icon">{pq.icon}</div>
                  <span>{pq.label}</span>
                </motion.button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-content section">
        <div className="container">
          {/* Search */}
          <AnimatedSection className="faq-search">
            <div className="faq-search__input">
              <FiSearch />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </AnimatedSection>

          <div className="faq-layout">
            {/* Categories */}
            {!search && (
              <AnimatedSection direction="right" className="faq-categories">
                {Object.keys(faqCategories).map(cat => (
                  <button
                    key={cat}
                    className={`faq-categories__btn ${activeCategory === cat ? 'faq-categories__btn--active' : ''}`}
                    onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                  >
                    {cat}
                    <span className="faq-categories__count">{faqCategories[cat].length}</span>
                  </button>
                ))}
              </AnimatedSection>
            )}

            {/* FAQ List */}
            <div className="faq-list">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, i) => (
                  <AnimatedSection key={i} delay={i * 0.05}>
                    <FAQItem
                      question={faq.q}
                      answer={faq.a}
                      isOpen={openIndex === i}
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                  </AnimatedSection>
                ))
              ) : (
                <div className="faq-empty">
                  <h3>No results found</h3>
                  <p>Try different keywords or browse by category.</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact CTA */}
          <AnimatedSection className="faq-cta">
            <div className="faq-cta__card">
              <h2>Still Have Questions?</h2>
              <p>Our support team is available 7 days a week. Get in touch through WhatsApp for instant answers or drop us a message.</p>
              <div className="faq-cta__stats">
                {supportStats.map((s, i) => (
                  <div key={i} className="faq-cta__stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="faq-cta__actions">
                <a
                  href={whatsappUrl('Hi, I have a question about Tastevo')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--whatsapp btn--lg"
                >
                  <FaWhatsapp /> Ask on WhatsApp
                </a>
                <Link to="/contact" className="btn btn--outline btn--lg">
                  Contact Form
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
