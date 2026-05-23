import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappUrl } from '../config/constants';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={whatsappUrl()}
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
