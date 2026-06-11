import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { FiHeart, FiAward, FiUsers, FiTarget, FiStar, FiCheck, FiArrowRight, FiGlobe, FiPackage } from 'react-icons/fi';
import { MdEco, MdDeliveryDining } from 'react-icons/md';

const team = [
  {
    name: 'Chef Arjun Mehta',
    role: 'Head Chef & Founder',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop',
    bio: 'With 20+ years of culinary expertise across Michelin-starred kitchens worldwide, Chef Arjun brings global techniques to authentic Indian flavours.',
  },
  {
    name: 'Sneha Iyer',
    role: 'Pastry Chef',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop',
    bio: 'Trained at Le Cordon Bleu, Sneha creates stunning desserts that marry Indian sweets with French pastry artistry.',
  },
  {
    name: 'Vikram Singh',
    role: 'Sous Chef',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop',
    bio: 'A master of North Indian and Mughlai cuisine, Vikram\'s biryanis and kebabs have earned a devoted following.',
  },
  {
    name: 'Meera Krishnan',
    role: 'Operations Head',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: 'Meera ensures every order reaches you perfectly — from kitchen to doorstep, she orchestrates the magic behind the scenes.',
  },
];

const stats = [
  { value: '50K+',  label: 'Orders Delivered',   icon: <MdDeliveryDining /> },
  { value: '200+',  label: 'Menu Items',          icon: <FiPackage /> },
  { value: '4.8★',  label: 'Average Rating',      icon: <FiStar /> },
  { value: '5+',    label: 'Years of Flavour',    icon: <FiAward /> },
];

const awards = [
  {
    year: '2024',
    title: 'Best Cloud Kitchen — Bangalore Food Awards',
    body: 'Voted the most loved cloud kitchen in Bangalore for consistent quality, innovation, and service by over 10,000 diners.',
  },
  {
    year: '2023',
    title: 'Sustainability Pioneer — Green Restaurant Initiative',
    body: 'Recognised for our zero-waste kitchen programme, 100% eco-friendly packaging, and farm-to-table sourcing commitment.',
  },
  {
    year: '2022',
    title: 'Digital Dining Innovator — TechEats India',
    body: 'Featured for pioneering QR-code menu and WhatsApp-first ordering in the Indian cloud kitchen space.',
  },
];

const values = [
  {
    icon: <FiHeart />,
    title: 'Passion for Food',
    desc: 'Every dish is a labour of love. Our chefs pour their heart into creating meals that delight your taste buds and nourish your soul.',
  },
  {
    icon: <MdEco />,
    title: 'Fresh & Sustainable',
    desc: 'We source ingredients from local organic farms and use eco-friendly packaging to reduce our environmental footprint.',
  },
  {
    icon: <FiUsers />,
    title: 'Community First',
    desc: 'We believe in giving back. 1% of every order goes towards providing meals to underprivileged children in our community.',
  },
  {
    icon: <FiAward />,
    title: 'Quality Promise',
    desc: 'Our FSSAI-certified kitchen follows the highest hygiene standards. Every ingredient is checked for quality before it enters our kitchen.',
  },
];

const milestones = [
  { year: '2020', title: 'The Beginning',   desc: 'Started as a small cloud kitchen in Koramangala with a handful of signature dishes and a dream to make great food accessible to everyone.' },
  { year: '2021', title: 'Going Digital',   desc: 'Launched our QR-code digital menu — no apps, no logins, just scan and browse. Fully contactless ordering via WhatsApp.' },
  { year: '2022', title: 'Growing Menu',    desc: 'Expanded our menu to 30+ dishes across four categories. Introduced seasonal specials and our now-iconic Veg Thali.' },
  { year: '2023', title: 'Community Roots', desc: 'Started sourcing from local organic farms. Launched our 1% meals pledge — a portion of every order goes to feeding children in need.' },
  { year: '2024', title: 'Built for Scale', desc: 'Rebuilt the ordering platform to handle volume. Faster response times, better WhatsApp order flow, and a shareable digital menu link.' },
  { year: '2025', title: 'What\'s Next',    desc: 'We\'re working on a real-time menu management system, direct online ordering, and expanding to serve more of Bangalore.' },
];

const About = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=600&fit=crop"
            alt="Fine dining"
          />
          <div className="page-hero__overlay"></div>
        </div>
        <div className="container page-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section__badge">Our Story</span>
            <h1>About Tastevo</h1>
            <p>From a small cloud kitchen to Bangalore's most loved restaurant — discover the passion, people, and purpose behind every plate.</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="about-stats section">
        <div className="container">
          <div className="about-stats__grid">
            {stats.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="about-stats__card">
                <div className="about-stats__icon">{s.icon}</div>
                <strong className="about-stats__value">{s.value}</strong>
                <span className="about-stats__label">{s.label}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story section">
        <div className="container">
          <div className="about-story__grid">
            <AnimatedSection direction="right" className="about-story__content">
              <span className="section__badge">Est. 2020</span>
              <h2 className="section__title">A Story of Passion & Flavour</h2>
              <p>
                Tastevo was born out of a simple belief: everyone deserves access to
                restaurant-quality food, delivered with love and care to their doorstep.
                Founded by Chef Arjun Mehta during the pandemic, we started as a small
                cloud kitchen with just five signature dishes.
              </p>
              <p>
                What began as a necessity quickly became a revolution. Our commitment to
                using fresh, locally-sourced ingredients, combined with time-honoured recipes
                and modern culinary techniques, struck a chord with food lovers across
                Bangalore. Within months, word spread through WhatsApp groups, food blogs,
                and word of mouth.
              </p>
              <p>
                Today, Tastevo serves over 200 dishes spanning North Indian, South
                Indian, Chinese-fusion, and global cuisines. But our core promise remains
                unchanged — every dish that leaves our kitchen is a dish we'd proudly
                serve to our own family.
              </p>
              <div className="about-story__highlights">
                <div className="about-story__highlight">
                  <FiCheck className="about-story__check" />
                  <span>100% Fresh Ingredients Daily</span>
                </div>
                <div className="about-story__highlight">
                  <FiCheck className="about-story__check" />
                  <span>FSSAI Certified Kitchen</span>
                </div>
                <div className="about-story__highlight">
                  <FiCheck className="about-story__check" />
                  <span>Eco-Friendly Packaging</span>
                </div>
                <div className="about-story__highlight">
                  <FiCheck className="about-story__check" />
                  <span>No Artificial Preservatives</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" className="about-story__images">
              <motion.div
                className="about-story__img about-story__img--1"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&h=600&fit=crop"
                  alt="Chef cooking"
                />
              </motion.div>
              <motion.div
                className="about-story__img about-story__img--2"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400&h=300&fit=crop"
                  alt="Fresh ingredients"
                />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge">What Drives Us</span>
            <h2 className="section__title">Our Core Values</h2>
            <p className="section__subtitle">
              These four pillars guide everything we do — from how we source ingredients
              to how we treat our team and community.
            </p>
          </AnimatedSection>

          <div className="about-values__grid">
            {values.map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="about-values__card">
                <div className="about-values__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="about-awards section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge">Recognition</span>
            <h2 className="section__title">Awards & Achievements</h2>
            <p className="section__subtitle">
              Humbled by the recognition we've received from the culinary community and our customers.
            </p>
          </AnimatedSection>
          <div className="about-awards__grid">
            {awards.map((a, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div className="about-awards__card" whileHover={{ y: -6 }}>
                  <div className="about-awards__year">{a.year}</div>
                  <FiAward className="about-awards__trophy" />
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge">Our Journey</span>
            <h2 className="section__title">Milestones & Growth</h2>
          </AnimatedSection>

          <div className="timeline">
            {milestones.map((m, i) => (
              <AnimatedSection
                key={i}
                delay={i * 0.1}
                direction={i % 2 === 0 ? 'right' : 'left'}
                className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
              >
                <div className="timeline__card">
                  <span className="timeline__year">{m.year}</span>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge">The People</span>
            <h2 className="section__title">Meet Our Team</h2>
            <p className="section__subtitle">
              Behind every great meal is an extraordinary team. Meet the talented people
              who make Tastevo special.
            </p>
          </AnimatedSection>

          <div className="about-team__grid">
            {team.map((member, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  className="about-team__card"
                  whileHover={{ y: -10 }}
                >
                  <div className="about-team__image">
                    <img src={member.image} alt={member.name} loading="lazy" />
                  </div>
                  <h3>{member.name}</h3>
                  <span className="about-team__role">{member.role}</span>
                  <p>{member.bio}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="cta-section">
        <div className="container">
          <AnimatedSection className="cta-section__content">
            <h2>Our Mission: Feed India Better</h2>
            <p>
              We're on a mission to make great food accessible to everyone. Through our
              digital menu platform, sustainable practices, and community initiatives,
              we're building a future where quality food is never more than a scan away.
            </p>
            <div className="cta-section__stats">
              <div>
                <MdDeliveryDining className="cta-section__stat-icon" />
                <strong>30 Min</strong>
                <span>Avg. Delivery</span>
              </div>
              <div>
                <FiTarget />
                <strong>Zero</strong>
                <span>Artificial Preservatives</span>
              </div>
              <div>
                <FiStar />
                <strong>FSSAI</strong>
                <span>Certified Kitchen</span>
              </div>
              <div>
                <FiGlobe />
                <strong>1%</strong>
                <span>Meals Pledge</span>
              </div>
            </div>
            <div className="about-cta__actions">
              <Link to="/menu" className="btn btn--primary btn--lg">
                Explore Our Menu <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn btn--outline btn--lg">
                Get in Touch
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;
