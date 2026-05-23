import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { FiArrowRight, FiClock, FiTruck, FiShield, FiStar, FiUsers, FiAward, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { MdRestaurantMenu, MdDeliveryDining, MdFoodBank } from 'react-icons/md';
import { QRCodeSVG } from 'qrcode.react';

const featuredItems = [
  {
    name: 'Butter Chicken',
    price: 349,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    isVeg: false,
    description: 'Creamy tomato-based curry with tender chicken pieces',
  },
  {
    name: 'Paneer Tikka',
    price: 279,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
    isVeg: true,
    description: 'Marinated cottage cheese grilled to perfection',
  },
  {
    name: 'Biryani Special',
    price: 399,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    isVeg: false,
    description: 'Fragrant basmati rice layered with aromatic spices',
  },
  {
    name: 'Masala Dosa',
    price: 149,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    isVeg: true,
    description: 'Crispy crepe filled with spiced potato filling',
  },
];

const stats = [
  { icon: <FiUsers />, number: '50,000+', label: 'Happy Customers' },
  { icon: <MdFoodBank />, number: '200+', label: 'Menu Items' },
  { icon: <FiAward />, number: '15+', label: 'Awards Won' },
  { icon: <FiStar />, number: '4.9', label: 'Average Rating' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Food Blogger',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    text: 'Tastevo has completely transformed how I order food. The digital menu is so intuitive, and the food quality is consistently outstanding. Their butter chicken is the best in Bangalore!',
    rating: 5,
  },
  {
    name: 'Rahul Patel',
    role: 'Regular Customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'The WhatsApp ordering feature is genius! No more waiting on hold. I just scan the QR code, pick my items, and order directly. Delivery is always on time and food is piping hot.',
    rating: 5,
  },
  {
    name: 'Ananya Reddy',
    role: 'Corporate Client',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    text: 'We order from Tastevo for all our office events. The combo meals are great value, and they handle bulk orders seamlessly. The veg options are particularly impressive.',
    rating: 5,
  },
];

const Home = () => {
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
                href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order"
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
            {featuredItems.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1} direction="up">
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
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(`I'd like to order ${item.name}`)}`}
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
            ))}
          </div>

          <AnimatedSection className="featured__cta">
            <Link to="/menu" className="btn btn--primary btn--lg">
              View Full Menu <FiArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge">What People Say</span>
            <h2 className="section__title">Loved by Thousands</h2>
            <p className="section__subtitle">
              Don't just take our word for it — hear from our community of food lovers
              who keep coming back for more.
            </p>
          </AnimatedSection>

          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <FiStar key={j} className="testimonial-card__star" />
                  ))}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <img src={t.avatar} alt={t.name} className="testimonial-card__avatar" />
                  <div>
                    <h4 className="testimonial-card__name">{t.name}</h4>
                    <span className="testimonial-card__role">{t.role}</span>
                  </div>
                </div>
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
