/**
 * Central config — all values come from .env (root)
 * To change phone/email/address: update .env, not these files.
 * Fallbacks ensure the app doesn't break if an env var is missing.
 */

export const WHATSAPP_NUMBER  = import.meta.env.VITE_WHATSAPP_NUMBER  || '919876543210';
export const BUSINESS_PHONE   = import.meta.env.VITE_BUSINESS_PHONE   || '+91 98765 43210';
export const BUSINESS_EMAIL   = import.meta.env.VITE_BUSINESS_EMAIL   || 'hello@tastevo.in';
export const BUSINESS_ADDRESS = import.meta.env.VITE_BUSINESS_ADDRESS || '123 Foodie Street, Koramangala, Bangalore 560034';
export const BUSINESS_HOURS   = import.meta.env.VITE_BUSINESS_HOURS   || 'Mon-Sun: 11:00 AM - 11:00 PM';

/**
 * Build a WhatsApp deep-link.
 * @param {string} message - Pre-filled chat message
 */
export const whatsappUrl = (message = 'Hi! I would like to place an order from Tastevo.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
