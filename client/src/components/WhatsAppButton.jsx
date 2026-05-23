import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phone = '919876543210';
  const message = encodeURIComponent('Hi! I would like to place an order from Tastevo.');

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-btn ${isHovered ? 'whatsapp-btn--hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Order on WhatsApp"
    >
      <FaWhatsapp className="whatsapp-btn__icon" />
      <span className="whatsapp-btn__text">Order Now</span>
    </a>
  );
};

export default WhatsAppButton;
