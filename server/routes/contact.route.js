const router  = require('express').Router();
const { body, validationResult } = require('express-validator');
const { formLimiter }  = require('../middleware/rateLimiter');
const Contact          = require('../models/Contact');
const { isReady }      = require('../db');
const {
  sendContactNotification,
  sendContactAutoReply,
} = require('../services/email.service');

const validate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ error: errors.array()[0].msg });
    return false;
  }
  return true;
};

router.post(
  '/contact',
  formLimiter,
  [
    body('name')
      .trim().notEmpty().withMessage('Name is required.')
      .isLength({ max: 100 }).withMessage('Name is too long.')
      .escape(),
    body('email')
      .trim().isEmail().withMessage('A valid email address is required.')
      .normalizeEmail(),
    body('phone')
      .optional({ checkFalsy: true })
      .trim()
      .matches(/^[\+\-\s\(\)\d]{7,20}$/).withMessage('Invalid phone number.'),
    body('message')
      .trim().notEmpty().withMessage('Message is required.')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters.')
      .escape(),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;

    const { name, email, phone, message } = req.body;

    // ── Persist to DB ──────────────────────────────────────────
    if (isReady()) {
      try {
        await Contact.create({ name, email, phone, message });
      } catch (err) {
        console.error('[contact] DB save error:', err.message);
        return res.status(500).json({ error: 'Could not save your message. Please try again.' });
      }
    } else {
      console.log('[contact] (no DB)', { name, email, phone: phone || 'N/A' });
    }

    // ── Send emails (non-blocking failures) ───────────────────
    await Promise.all([
      sendContactNotification({ name, email, phone, message }),
      sendContactAutoReply({ name, email, message }),
    ]);

    res.json({ success: true, message: 'Thank you! We will get back to you soon.' });
  }
);

module.exports = router;
