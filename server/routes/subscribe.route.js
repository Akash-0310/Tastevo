const router  = require('express').Router();
const { body, validationResult } = require('express-validator');
const { apiLimiter } = require('../middleware/rateLimiter');
const Subscriber     = require('../models/Subscriber');
const { isReady }    = require('../db');

const validate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ error: errors.array()[0].msg });
    return false;
  }
  return true;
};

router.post(
  '/subscribe',
  apiLimiter,
  [
    body('email')
      .trim().isEmail().withMessage('A valid email address is required.')
      .normalizeEmail(),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;

    const { email } = req.body;

    if (isReady()) {
      try {
        await Subscriber.create({ email });
      } catch (err) {
        // Duplicate key error (email already subscribed)
        if (err.code === 11000) {
          return res.json({ success: true, message: "You're already subscribed!" });
        }
        console.error('[subscribe] DB save error:', err.message);
        return res.status(500).json({ error: 'Could not subscribe. Please try again.' });
      }
    } else {
      console.log('[subscribe] (no DB)', email);
    }

    res.json({ success: true, message: 'Successfully subscribed to our newsletter!' });
  }
);

module.exports = router;
