import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { FiArrowRight, FiDownload, FiBookOpen, FiVideo, FiFileText, FiExternalLink, FiZap, FiThumbsUp, FiMail } from 'react-icons/fi';
import { MdRestaurantMenu, MdEco, MdFoodBank } from 'react-icons/md';
import { QRCodeSVG } from 'qrcode.react';

const blogPosts = [
  {
    title: 'The Art of Indian Spices: A Complete Guide',
    excerpt: 'Discover the 20 essential spices that form the backbone of Indian cuisine. Learn about their flavour profiles, health benefits, and how to use them in your everyday cooking.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
    date: 'March 15, 2025',
    category: 'Cooking Tips',
    readTime: '8 min read',
  },
  {
    title: 'Farm to Table: How We Source Our Ingredients',
    excerpt: 'Take a behind-the-scenes look at our supply chain. From organic farms in Karnataka to your plate, see how we ensure every ingredient meets our quality standards.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop',
    date: 'February 28, 2025',
    category: 'Behind the Scenes',
    readTime: '6 min read',
  },
  {
    title: '10 Regional Indian Dishes You Must Try Before You Die',
    excerpt: 'India has over 30 regional cuisines, each with unique flavours. Here are 10 extraordinary dishes from across the country that will change how you think about Indian food.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    date: 'February 10, 2025',
    category: 'Food Culture',
    readTime: '10 min read',
  },
  {
    title: 'Healthy Eating: Indian Style',
    excerpt: 'Indian cuisine is inherently balanced with proteins, carbs, fats, and fibre. Learn how traditional Indian meals are among the healthiest in the world.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop',
    date: 'January 22, 2025',
    category: 'Health & Wellness',
    readTime: '7 min read',
  },
];

const guides = [
  {
    icon: <MdRestaurantMenu />,
    title: 'Complete Menu Guide',
    desc: 'Download our full menu with nutritional information, allergen details, and chef\'s recommended pairings for every dish.',
    action: 'Download PDF',
  },
  {
    icon: <MdEco />,
    title: 'Sustainability Report 2024',
    desc: 'See our environmental impact, sustainability initiatives, and how we\'re working towards a zero-waste kitchen by 2026.',
    action: 'Read Report',
  },
  {
    icon: <MdFoodBank />,
    title: 'Catering Guide',
    desc: 'Planning an event? Our comprehensive catering guide covers menus, pricing, setup options, and everything you need for a perfect occasion.',
    action: 'Download Guide',
  },
];

const videos = [
  {
    title: 'How to Make Perfect Butter Chicken at Home',
    thumbnail: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=340&fit=crop',
    duration: '12:45',
    views: '2.3M views',
  },
  {
    title: 'The Secret Behind Our Hyderabadi Biryani',
    thumbnail: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=340&fit=crop',
    duration: '18:20',
    views: '1.8M views',
  },
  {
    title: 'Kitchen Tour: Inside Tastevo\'s FSSAI-Certified Kitchen',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=340&fit=crop',
    duration: '8:30',
    views: '890K views',
  },
];

const quickTips = [
  { icon: '🧄', tip: 'Bloom your spices in hot oil for 30 seconds before adding other ingredients — this releases essential oils and deepens flavour.' },
  { icon: '🧅', tip: 'Salt your onions while frying. The salt draws out moisture and speeds caramelisation, giving a richer, sweeter base.' },
  { icon: '🫙', tip: 'Add a pinch of sugar to acidic tomato-based gravies to balance the sourness without overpowering the dish.' },
  { icon: '🍋', tip: 'Finish dishes with a squeeze of lemon right before serving — it brightens all the flavours without adding sourness to the gravy.' },
  { icon: '🌿', tip: 'Add fresh coriander and mint after the heat is off. Heat destroys their volatile oils — add them cold for maximum aroma.' },
  { icon: '🥘', tip: 'Dum cooking (sealing and slow-cooking on low heat) is the secret to tender meats and fragrant biryanis. A tight-fitting lid is essential.' },
];

const Resources = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone]   = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) setNewsletterDone(true);
  };

  return (
    <div className="resources-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=1600&h=600&fit=crop"
            alt="Food preparation"
          />
          <div className="page-hero__overlay"></div>
        </div>
        <div className="container page-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section__badge">Learn & Explore</span>
            <h1>Resources</h1>
            <p>Dive into our collection of recipes, cooking guides, food stories, and downloadable resources. Become a better foodie with Tastevo.</p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="resources-blog section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge"><FiBookOpen /> From Our Kitchen</span>
            <h2 className="section__title">Latest Articles & Stories</h2>
            <p className="section__subtitle">
              Recipes, cooking tips, food culture stories, and behind-the-scenes glimpses
              from the Tastevo kitchen.
            </p>
          </AnimatedSection>

          <div className="resources-blog__grid">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  className="blog-card"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="blog-card__image">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <span className="blog-card__category">{post.category}</span>
                  </div>
                  <div className="blog-card__content">
                    <div className="blog-card__meta">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="blog-card__link">
                      Read More <FiArrowRight />
                    </span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe of the Week */}
      <section className="resources-recipe section">
        <div className="container">
          <AnimatedSection>
            <div className="resources-recipe__card">
              <div className="resources-recipe__image">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&h=500&fit=crop"
                  alt="Hyderabadi Biryani"
                  loading="lazy"
                />
                <span className="resources-recipe__badge">
                  <FiZap /> Recipe of the Week
                </span>
              </div>
              <div className="resources-recipe__content">
                <span className="section__badge">Chef's Pick</span>
                <h2>Hyderabadi Dum Biryani</h2>
                <p>
                  A fragrant, layered masterpiece — long-grain Basmati rice slow-cooked over
                  marinated meat with saffron, fried onions, and whole spices. Our Head Chef
                  Arjun shares the technique that makes our biryani Bangalore's most talked-about.
                </p>
                <div className="resources-recipe__meta">
                  <span><strong>Prep:</strong> 40 min</span>
                  <span><strong>Cook:</strong> 1 hr 20 min</span>
                  <span><strong>Serves:</strong> 4–6</span>
                  <span><strong>Level:</strong> Intermediate</span>
                </div>
                <div className="resources-recipe__actions">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                  >
                    <FiVideo /> Watch Recipe
                  </a>
                  <Link to="/menu" className="btn btn--outline">
                    Order Biryani <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Cooking Tips */}
      <section className="resources-tips section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge"><FiThumbsUp /> Pro Tips</span>
            <h2 className="section__title">Quick Cooking Tips from Our Chefs</h2>
            <p className="section__subtitle">
              Small techniques that make a big difference. Master these and elevate every dish you cook.
            </p>
          </AnimatedSection>
          <div className="resources-tips__grid">
            {quickTips.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <motion.div className="resources-tip__card" whileHover={{ y: -5 }}>
                  <span className="resources-tip__emoji">{item.icon}</span>
                  <p>{item.tip}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Video Recipes */}
      <section className="resources-videos section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge"><FiVideo /> Watch & Learn</span>
            <h2 className="section__title">Video Recipes & Tours</h2>
            <p className="section__subtitle">
              Go behind the scenes with our chefs. Watch step-by-step recipe tutorials
              and exclusive kitchen tours.
            </p>
          </AnimatedSection>

          <div className="resources-videos__grid">
            {videos.map((video, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  className="video-card"
                  whileHover={{ y: -8 }}
                >
                  <div className="video-card__thumbnail">
                    <img src={video.thumbnail} alt={video.title} loading="lazy" />
                    <div className="video-card__play">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="video-card__duration">{video.duration}</span>
                  </div>
                  <div className="video-card__info">
                    <h3>{video.title}</h3>
                    <span>{video.views}</span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Guides */}
      <section className="resources-guides section">
        <div className="container">
          <AnimatedSection className="section__header">
            <span className="section__badge"><FiFileText /> Downloads</span>
            <h2 className="section__title">Downloadable Guides</h2>
            <p className="section__subtitle">
              Free resources to help you explore our menu, plan events, and learn
              about our sustainability practices.
            </p>
          </AnimatedSection>

          <div className="resources-guides__grid">
            {guides.map((guide, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  className="guide-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="guide-card__icon">{guide.icon}</div>
                  <h3>{guide.title}</h3>
                  <p>{guide.desc}</p>
                  <button className="btn btn--outline">
                    <FiDownload /> {guide.action}
                  </button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code Download */}
      <section className="resources-qr section">
        <div className="container">
          <div className="resources-qr__content">
            <AnimatedSection direction="right">
              <span className="section__badge">For Restaurants</span>
              <h2 className="section__title">Get Your QR Code</h2>
              <p>
                Are you a restaurant owner looking to go digital? Tastevo's digital
                menu platform is available for all restaurants. Get a customised QR code
                for your establishment and join the digital dining revolution.
              </p>
              <ul className="resources-qr__features">
                <li><FiExternalLink /> No app downloads for your customers</li>
                <li><FiExternalLink /> Real-time menu updates</li>
                <li><FiExternalLink /> WhatsApp ordering integration</li>
                <li><FiExternalLink /> Multi-language support</li>
                <li><FiExternalLink /> Analytics dashboard</li>
              </ul>
              <Link to="/contact" className="btn btn--primary btn--lg">
                Get Started Free <FiArrowRight />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="left" className="resources-qr__code">
              <div className="qr-section__card">
                <h3>Our Menu QR Code</h3>
                <QRCodeSVG
                  value={window.location.origin + '/menu'}
                  size={180}
                  bgColor="transparent"
                  fgColor="currentColor"
                  level="H"
                  includeMargin
                />
                <p>Scan to access our full menu</p>
                <button className="btn btn--outline btn--sm">
                  <FiDownload /> Download QR
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="resources-newsletter section">
        <div className="container">
          <AnimatedSection className="resources-newsletter__card">
            <div className="resources-newsletter__text">
              <FiMail className="resources-newsletter__icon" />
              <div>
                <h2>Get Weekly Food Inspo in Your Inbox</h2>
                <p>
                  New recipes, chef tips, seasonal specials, and exclusive discounts —
                  delivered every Thursday. Join 8,000+ food lovers who read our newsletter.
                </p>
              </div>
            </div>
            {newsletterDone ? (
              <div className="resources-newsletter__success">
                <FiThumbsUp /> You're subscribed! Check your inbox on Thursday.
              </div>
            ) : (
              <form className="resources-newsletter__form" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn--primary">
                  Subscribe Free
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Resources;
