import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import {
  FiFileText, FiShoppingCart, FiTruck, FiRefreshCw,
  FiAlertTriangle, FiLock, FiUser, FiMessageSquare, FiChevronDown,
} from 'react-icons/fi';
import { BUSINESS_EMAIL, BUSINESS_PHONE } from '../config/constants';

const lastUpdated = 'June 2025';

const clauses = [
  {
    id: 'acceptance',
    icon: <FiFileText />,
    title: '1. Acceptance of Terms',
    items: [
      {
        heading: '1.1 Agreement to Terms',
        body: 'By accessing or using the Tastevo website (tastevo.in), placing orders via WhatsApp, or using any of our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of our services immediately.',
      },
      {
        heading: '1.2 Eligibility',
        body: 'You must be at least 18 years old to place orders or enter into binding agreements with Tastevo. By using our services, you represent and warrant that you meet this age requirement. Minors may use the website under the supervision of a parent or guardian who agrees to these terms.',
      },
      {
        heading: '1.3 Modifications',
        body: 'We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page with a new "Last Updated" date. Continued use of our services after changes are posted constitutes your acceptance of the modified Terms. We will notify registered users of material changes via email with at least 14 days notice.',
      },
    ],
  },
  {
    id: 'services',
    icon: <FiUser />,
    title: '2. Our Services',
    items: [
      {
        heading: '2.1 Digital Menu',
        body: 'Tastevo provides a digital menu accessible via our website and QR codes. The menu is for informational purposes to facilitate WhatsApp ordering. Menu items, prices, and availability are subject to change without notice. Photographs are for illustrative purposes and actual presentation may vary.',
      },
      {
        heading: '2.2 WhatsApp Ordering',
        body: 'Orders are placed and confirmed via WhatsApp. An order is considered confirmed only when you receive an explicit confirmation message from our team. Until then, item availability, pricing, or delivery feasibility may require clarification.',
      },
      {
        heading: '2.3 Reservation System',
        body: 'Table reservations submitted via our website are requests, not confirmed bookings. A reservation is confirmed only after you receive a confirmation call or WhatsApp message from us. We reserve the right to decline reservations based on capacity.',
      },
      {
        heading: '2.4 Service Area',
        body: 'Delivery services are available within our designated service zones in Bangalore. We do not guarantee delivery availability to all locations. You will be informed at the time of ordering if your address falls outside our delivery area.',
      },
    ],
  },
  {
    id: 'ordering',
    icon: <FiShoppingCart />,
    title: '3. Ordering & Payment',
    items: [
      {
        heading: '3.1 Order Placement',
        body: 'By placing an order, you offer to purchase the items at the prices specified in our current menu. We reserve the right to refuse or cancel any order for reasons including but not limited to: item unavailability, pricing errors, or suspected fraudulent activity.',
      },
      {
        heading: '3.2 Pricing',
        body: 'All prices on our menu are inclusive of applicable GST (5%). Prices are subject to change without prior notice, but the price at the time of your order confirmation will be honoured. Delivery charges, if any, are communicated clearly before order confirmation.',
      },
      {
        heading: '3.3 Payment Methods',
        body: 'We accept UPI (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery. Payment for WhatsApp orders is typically processed via UPI payment link sent on order confirmation. All online payments are processed through secure, PCI-compliant payment gateways.',
      },
      {
        heading: '3.4 Payment Disputes',
        body: 'If you believe a payment error has occurred, contact us within 48 hours at ' + BUSINESS_EMAIL + '. We will investigate and resolve payment disputes within 7 business days. Chargebacks initiated without first contacting us may result in account suspension.',
      },
    ],
  },
  {
    id: 'delivery',
    icon: <FiTruck />,
    title: '4. Delivery Policy',
    items: [
      {
        heading: '4.1 Delivery Times',
        body: 'Our standard delivery time is 25–45 minutes from order confirmation, depending on your location and kitchen load. Delivery estimates are approximate and not guaranteed. During peak hours (12–2 PM and 7–10 PM), times may be longer.',
      },
      {
        heading: '4.2 Delivery Responsibility',
        body: 'Risk of loss and title to items pass to you upon delivery to your specified address. If no one is available to receive the order, our delivery partner will attempt to contact you. If contact fails after two attempts, the order may be deemed delivered and no refund will be issued.',
      },
      {
        heading: '4.3 Incorrect Address',
        body: 'You are responsible for providing an accurate and complete delivery address. Tastevo is not liable for failed deliveries or additional charges resulting from an incorrect address provided by you.',
      },
      {
        heading: '4.4 Large & Catering Orders',
        body: 'For orders of 20+ meals or catering bookings, advance booking of at least 24 hours (for regular) or 72 hours (for catering events) is required. Special delivery arrangements will be confirmed via WhatsApp.',
      },
    ],
  },
  {
    id: 'cancellations',
    icon: <FiRefreshCw />,
    title: '5. Cancellations & Refunds',
    items: [
      {
        heading: '5.1 Order Cancellation Window',
        body: 'You may cancel your order within 5 minutes of placing it by messaging us on WhatsApp. Once our kitchen has begun preparing your order, cancellation is not possible. We will confirm cancellation and process any applicable refund.',
      },
      {
        heading: '5.2 Refund Eligibility',
        body: 'Refunds are issued if: (a) you cancel within the permitted window, (b) your order was not delivered due to our fault, (c) you received incorrect items, or (d) there is a verifiable quality issue with the food. Refunds are not issued for change of mind after the kitchen starts preparation.',
      },
      {
        heading: '5.3 Refund Process',
        body: 'Approved refunds are processed within 5–7 business days to your original payment method. For cash-on-delivery orders, refunds are made via UPI transfer. Contact us at ' + BUSINESS_EMAIL + ' or ' + BUSINESS_PHONE + ' to initiate a refund claim.',
      },
      {
        heading: '5.4 Quality Complaints',
        body: 'If you are unhappy with the quality of your food, contact us via WhatsApp within 1 hour of delivery with a description and, where appropriate, a photo of the issue. We will offer a replacement, discount on next order, or refund at our discretion.',
      },
    ],
  },
  {
    id: 'conduct',
    icon: <FiMessageSquare />,
    title: '6. User Conduct',
    items: [
      {
        heading: '6.1 Prohibited Behaviour',
        body: 'You agree not to: use our services for any unlawful purpose; provide false information during ordering or reservation; abuse, harass, or threaten our staff; place fraudulent orders; or attempt to manipulate our pricing or promotions dishonestly.',
      },
      {
        heading: '6.2 Reviews & Feedback',
        body: 'Any feedback or reviews you submit must be honest, based on actual experience, and not defamatory or misleading. We reserve the right to remove content that violates these guidelines. Fake or incentivised reviews are prohibited.',
      },
      {
        heading: '6.3 Consequences of Misuse',
        body: 'Violation of these conduct rules may result in refusal of service, cancellation of pending orders without refund (where justified), and reporting to relevant authorities for illegal activity.',
      },
    ],
  },
  {
    id: 'ip',
    icon: <FiLock />,
    title: '7. Intellectual Property',
    items: [
      {
        heading: '7.1 Our Content',
        body: 'All content on the Tastevo website — including text, photographs, logos, menu designs, graphics, and software — is owned by or licensed to Tastevo and is protected by applicable intellectual property laws. You may not copy, reproduce, or distribute our content without explicit written permission.',
      },
      {
        heading: '7.2 Our Brand',
        body: 'The Tastevo name, logo, and associated marks are our trademarks. You may not use these marks in any way that suggests endorsement, affiliation, or partnership with Tastevo without prior written consent.',
      },
      {
        heading: '7.3 User-Submitted Content',
        body: 'By submitting reviews, feedback, or photographs to us (e.g., via WhatsApp or social media), you grant Tastevo a non-exclusive, royalty-free licence to use, adapt, and publish that content for marketing and service improvement purposes.',
      },
    ],
  },
  {
    id: 'liability',
    icon: <FiAlertTriangle />,
    title: '8. Limitation of Liability',
    items: [
      {
        heading: '8.1 Disclaimer of Warranties',
        body: 'Our services are provided "as is" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.',
      },
      {
        heading: '8.2 Allergen Disclaimer',
        body: 'While we clearly label allergens and accommodate dietary requests, our kitchen processes ingredients that may contain common allergens including nuts, dairy, gluten, and soy. We cannot guarantee a completely allergen-free environment. Customers with severe allergies should contact us before ordering.',
      },
      {
        heading: '8.3 Limitation of Damages',
        body: 'To the maximum extent permitted by law, Tastevo\'s liability for any claim arising from use of our services shall not exceed the value of the order in question. We are not liable for indirect, incidental, consequential, or punitive damages.',
      },
      {
        heading: '8.4 Force Majeure',
        body: 'We are not liable for delays or failures in service caused by circumstances beyond our reasonable control, including natural disasters, internet outages, government restrictions, or other force majeure events.',
      },
    ],
  },
];

const ClauseItem = ({ clause, isOpen, onToggle }) => (
  <div className={`terms-accordion__item ${isOpen ? 'terms-accordion__item--open' : ''}`}>
    <button className="terms-accordion__trigger" onClick={onToggle}>
      <div className="terms-accordion__icon">{clause.icon}</div>
      <h3>{clause.title}</h3>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className="terms-accordion__chevron"
      >
        <FiChevronDown />
      </motion.div>
    </button>
    <motion.div
      className="terms-accordion__body"
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'hidden' }}
    >
      <div className="terms-accordion__content">
        {clause.items.map((item, i) => (
          <div key={i} className="terms-accordion__block">
            <h4>{item.heading}</h4>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

const Terms = () => {
  const [openClause, setOpenClause] = useState(0);

  return (
    <div className="terms-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1600&h=600&fit=crop"
            alt="Terms and conditions"
          />
          <div className="page-hero__overlay"></div>
        </div>
        <div className="container page-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section__badge">Legal</span>
            <h1>Terms of Service</h1>
            <p>Please read these terms carefully before using Tastevo's services. They define our mutual obligations and help us serve you better.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
              Last updated: {lastUpdated} &nbsp;·&nbsp; Effective: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary banner */}
      <section className="terms-summary section">
        <div className="container">
          <AnimatedSection>
            <div className="terms-summary__grid">
              {[
                { icon: <FiShoppingCart />, label: 'Cancel within 5 min of ordering' },
                { icon: <FiTruck />,        label: '25–45 min standard delivery' },
                { icon: <FiRefreshCw />,    label: 'Refunds within 5–7 business days' },
                { icon: <FiMessageSquare />,label: 'Quality issues? Contact within 1 hour' },
              ].map((item, i) => (
                <div key={i} className="terms-summary__item">
                  <div className="terms-summary__icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Full terms */}
      <section className="terms-content section">
        <div className="container">
          <div className="terms-layout">
            {/* TOC */}
            <AnimatedSection direction="right" className="terms-toc">
              <h4>Contents</h4>
              <nav>
                {clauses.map((c, i) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className={`terms-toc__link ${openClause === i ? 'terms-toc__link--active' : ''}`}
                    onClick={(e) => { e.preventDefault(); setOpenClause(i); }}
                  >
                    {c.title}
                  </a>
                ))}
              </nav>
            </AnimatedSection>

            {/* Clauses */}
            <div className="terms-accordion">
              {clauses.map((clause, i) => (
                <AnimatedSection key={clause.id} delay={i * 0.04} id={clause.id}>
                  <ClauseItem
                    clause={clause}
                    isOpen={openClause === i}
                    onToggle={() => setOpenClause(openClause === i ? null : i)}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governing law + contact */}
      <section className="terms-footer-section section">
        <div className="container">
          <AnimatedSection>
            <div className="terms-footer-grid">
              <div className="terms-footer-card terms-footer-card--law">
                <h3>Governing Law</h3>
                <p>
                  These Terms of Service are governed by the laws of India. Any disputes
                  arising from these terms or your use of Tastevo's services shall be subject
                  to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  These terms are subject to the Consumer Protection Act, 2019, the
                  Information Technology Act, 2000, and other applicable Indian laws.
                </p>
              </div>
              <div className="terms-footer-card terms-footer-card--contact">
                <h3>Questions About These Terms?</h3>
                <p>If you have questions or concerns about our Terms of Service, reach out to us:</p>
                <div className="terms-footer-card__links">
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="btn btn--primary">
                    <FiFileText /> Email Legal Team
                  </a>
                  <Link to="/contact" className="btn btn--outline">
                    Contact Us
                  </Link>
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.7 }}>
                  {BUSINESS_EMAIL} &nbsp;·&nbsp; {BUSINESS_PHONE}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Terms;
