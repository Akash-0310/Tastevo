import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { FiArrowRight, FiClock, FiTruck, FiShield, FiStar, FiAward, FiHeart, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { MdRestaurantMenu, MdDeliveryDining, MdFoodBank } from 'react-icons/md';
import { QRCodeSVG } from 'qrcode.react';
import { whatsappUrl, WHATSAPP_NUMBER } from '../config/constants';
import { useFeaturedItems } from '../hooks/useMenu';

const stats = [
  { icon: <FiShield />,        number: '100%',  label: 'Fresh Ingredients'   },
  { icon: <FiClock />,         number: '30 Min', label: 'Avg. Delivery Time'  },
  { icon: <MdFoodBank />,      number: '30+',   label: 'Signature Dishes'    },
  { icon: <FiAward />,         number: 'FSSAI', label: 'Certified Kitchen'   },
];

// Testimonials will be loaded from the database in Phase 2.
// For now we invite real customers to share their experience.

// Skeleton placeholder for a featured card while loading
const FeaturedSkeleton = () => (
  <div className="skeleton-card skeleton-card--featured">
    <div className="skeleton skeleton--image skeleton--image-featured" />
    <div className="skeleton-card__body">
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--text" />
      <div className="skeleton-card__footer">
        <div className="skeleton skeleton--price" />
        <div className="skeleton skeleton--btn" />
      </div>
    </div>
  </div>
);

const Home = () => {
  const { featuredItems, loading: featuredLoading } = useFeaturedItems();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__overlay"></div>
          <motion.div
            className="hero__floating-shapes"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          >
            <div className="hero__shape hero__shape--1"></div>
            <div className="hero__shape hero__shape--2"></div>
            <div className="hero__shape hero__shape--3"></div>
          </motion.div>
        </div>

        <div className="container hero__container">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="hero__badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FiStar className="hero__badge-icon" /> #1 Rated Restaurant in Bangalore
            </motion.span>

            <h1 className="hero__title">
              Authentic Flavours,
              <br />
              <span className="hero__title-accent">Delivered Fresh</span>
              <br />
              To Your Door
            </h1>

            <p className="hero__subtitle">
              Experience a culinary journey like no other. Browse our digital menu,
              discover handcrafted dishes made with the finest ingredients, and order
              instantly via WhatsApp. From aromatic biryanis to decadent desserts —
              your favourite meal is just a scan away.
            </p>

            <div className="hero__actions">
              <Link to="/menu" className="btn btn--primary btn--lg">
                <MdRestaurantMenu /> Explore Menu
              </Link>
              <a
                href={whatsappUrl('Hi! I want to order')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp btn--lg"
              >
                <FaWhatsapp /> Order on WhatsApp
              </a>
            </div>

            <div className="hero__features">
              <div className="hero__feature">
                <FiClock /> <span>30 Min Delivery</span>
              </div>
              <div className="hero__feature">
                <FiTruck /> <span>Free Delivery</span>
              </div>
              <div className="hero__feature">
                <FiShield /> <span>100% Hygienic</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero__image-grid">
              <motion.div
                className="hero__image-card hero__image-card--1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=500&fit=crop"
                  alt="Delicious Indian cuisine"
                />
              </motion.div>
              <motion.div
                className="hero__image-card hero__image-card--2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop"
                  alt="Fresh ingredients"
                />
              </motion.div>
              <motion.div
                className="hero__image-card hero__image-card--3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop"
                  alt="Chef preparing food"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="stats__item">
                <div className="stats__icon">{stat.icon}</div>
                <motion.h3
                  className="stats__number"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.h3>
                <p className="stats__label">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge">Simple & Easy</span>
            <h2 className="section__title">How It Works</h2>
            <p className="section__subtitle">
              Order your favourite food in just 3 simple steps. No app downloads needed —
              everything works right from your phone's camera and WhatsApp.
            </p>
          </AnimatedSection>

          <div className="how-it-works__grid">
            {[
              {
                step: '01',
                icon: <MdRestaurantMenu />,
                title: 'Scan QR Code',
                desc: 'Simply point your phone camera at our QR code placed on tables, standees, or our storefront. Instantly access our full digital menu without downloading any app.',
              },
              {
                step: '02',
                icon: <FiHeart />,
                title: 'Choose Your Favourites',
                desc: 'Browse through our beautifully designed menu with high-quality food photos, detailed descriptions, prices, and dietary information. Find exactly what you crave.',
              },
              {
                step: '03',
                icon: <MdDeliveryDining />,
                title: 'Order & Enjoy',
                desc: 'Tap the WhatsApp order button, confirm your selection, and sit back. Your freshly prepared meal will be delivered to your doorstep within 30 minutes, guaranteed hot.',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="how-it-works__card">
                <span className="how-it-works__step">{item.step}</span>
                <div className="how-it-works__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="featured section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge">Chef's Picks</span>
            <h2 className="section__title">Featured Dishes</h2>
            <p className="section__subtitle">
              Handpicked by our head chef — these crowd favourites are loved by thousands
              of customers and represent the very best of what Tastevo has to offer.
            </p>
          </AnimatedSection>

          <div className="featured__grid">
            {featuredLoading
              ? Array.from({ length: 4 }).map((_, i) => <FeaturedSkeleton key={i} />)
              : featuredItems.map((item, i) => (
                  <AnimatedSection key={item._id || item.name} delay={i * 0.1} direction="up">
                    <motion.div
                      className="featured__card"
                      whileHover={{ y: -10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="featured__image">
                        <img src={item.image} alt={item.name} loading="lazy" />
                        <span className={`menu-card__badge ${item.isVeg ? 'menu-card__badge--veg' : 'menu-card__badge--nonveg'}`}>
                          <span className="menu-card__badge-dot"></span>
                          {item.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                      <div className="featured__info">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <div className="featured__footer">
                          <span className="featured__price">₹{item.price}</span>
                          <a
                            href={whatsappUrl(`I'd like to order ${item.name}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--sm btn--whatsapp"
                          >
                            <FaWhatsapp /> Order
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))
            }
          </div>

          <AnimatedSection className="featured__cta">
            <Link to="/menu" className="btn btn--primary btn--lg">
              View Full Menu <FiArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Share Your Experience */}
      <section className="testimonials section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge">Your Feedback Matters</span>
            <h2 className="section__title">Share Your Experience</h2>
            <p className="section__subtitle">
              Tried something you loved? We'd genuinely love to hear about it.
              Your honest feedback helps us serve you better — every single time.
            </p>
          </AnimatedSection>

          <div className="testimonials__invite" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem' }}>
            {[
              { icon: <FiMessageCircle />, title: 'Tell us on WhatsApp', desc: 'Send us a quick message — what you loved, what we can improve. We read every message.', cta: 'Send Feedback', href: whatsappUrl('Hi! I wanted to share my experience with Tastevo:') },
              { icon: <FiStar />, title: 'Rate us on Google', desc: 'A Google review helps other food lovers find us and tells us how we\'re doing.', cta: 'Leave a Review', href: 'https://g.page/r/tastevo' },
            ].map((card, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="testimonial-card" style={{ flex: '1 1 280px', maxWidth: '360px' }}>
                <div className="testimonial-card__stars" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                  {card.icon}
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{card.title}</h3>
                <p className="testimonial-card__text" style={{ fontStyle: 'normal' }}>{card.desc}</p>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                  style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {card.cta}
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="qr-section section">
        <div className="container">
          <div className="qr-section__content">
            <AnimatedSection direction="right">
              <span className="section__badge">Scan & Order</span>
              <h2 className="section__title">Quick Access via QR Code</h2>
              <p className="section__subtitle" style={{ textAlign: 'left' }}>
                No app downloads. No sign-ups. Just scan our QR code with your phone camera
                and get instant access to our complete menu. Perfect for dine-in customers
                or anyone who wants quick access to our offerings.
              </p>
              <ul className="qr-section__list">
                <li>Instant access — no app needed</li>
                <li>Always up-to-date menu & prices</li>
                <li>Works on any smartphone</li>
                <li>Share with friends easily</li>
                <li>Available in multiple languages</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="left" className="qr-section__code">
              <div className="qr-section__card">
                <h3>Scan to View Menu</h3>
                <QRCodeSVG
                  value={window.location.origin + '/menu'}
                  size={200}
                  bgColor="transparent"
                  fgColor="currentColor"
                  level="H"
                  includeMargin
                />
                <p>Point your camera at this code</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <AnimatedSection className="cta-section__content">
            <h2>Ready to Experience Amazing Food?</h2>
            <p>
              Join 50,000+ happy customers who have discovered the joy of effortless
              food ordering. Browse our menu, pick your favourites, and let us bring
              the feast to you.
            </p>
            <div className="cta-section__actions">
              <Link to="/menu" className="btn btn--white btn--lg">
                <MdRestaurantMenu /> Browse Menu
              </Link>
              <Link to="/contact" className="btn btn--outline-white btn--lg">
                Book a Table <FiArrowRight />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
