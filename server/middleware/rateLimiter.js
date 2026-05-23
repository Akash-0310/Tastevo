const rateLimit = require('express-rate-limit');

/** General API: 20 requests per 15 minutes per IP */
const apiLimiter = rateLimit({
  windowMs:       15 * 60 * 1000,
  max:            20,
  standardHeaders: true,
  legacyHeaders:  false,
  message:        { error: 'Too many requests. Please try again later.' },
});

/** Strict form limiter: 5 submissions per hour per IP */
const formLimiter = rateLimit({
  windowMs:       60 * 60 * 1000,
  max:            5,
  standardHeaders: true,
  legacyHeaders:  false,
  message:        { error: 'Too many submissions. Please wait before trying again.' },
});

module.exports = { apiLimiter, formLimiter };
