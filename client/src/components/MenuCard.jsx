import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import { whatsappUrl } from '../config/constants';

const MenuCard = ({ item, index }) => {
  const orderLink = whatsappUrl(`Hi! I'd like to order: ${item.name} - ₹${item.price}`);

  return (
    <motion.div
      className="menu-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="menu-card__image-wrapper">
        <img
          src={item.image}
          alt={item.name}
          className="menu-card__image"
          loading="lazy"
        />
        <span className={`menu-card__badge ${item.isVeg ? 'menu-card__badge--veg' : 'menu-card__badge--nonveg'}`}>
          <span className="menu-card__badge-dot"></span>
          {item.isVeg ? 'Veg' : 'Non-Veg'}
        </span>
        {item.isPopular && (
          <span className="menu-card__popular">
            <FiStar /> Popular
          </span>
        )}
        {item.isNew && (
          <span className="menu-card__new">New</span>
        )}
      </div>

      <div className="menu-card__content">
        <div className="menu-card__header">
          <h3 className="menu-card__name">{item.name}</h3>
          <span className="menu-card__price">₹{item.price}</span>
        </div>
        <p className="menu-card__desc">{item.description}</p>
        {item.rating && (
          <div className="menu-card__rating">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`menu-card__star ${i < item.rating ? 'menu-card__star--filled' : ''}`}
              />
            ))}
            <span className="menu-card__rating-text">({item.reviews} reviews)</span>
          </div>
        )}
        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--whatsapp menu-card__order"
        >
          <FaWhatsapp /> Order via WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

export default MenuCard;
