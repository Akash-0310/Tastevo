const router  = require('express').Router();
const { body }         = require('express-validator');
const { formLimiter }  = require('../middleware/rateLimiter');
const handleValidation = require('../middleware/validate');
const Reservation      = require('../models/Reservation');
const { isReady }      = require('../db');
const {
  sendReservationNotification,
  sendReservationConfirmation,
} = require('../services/email.service');

router.post(
  '/reserve',
  formLimiter,
  [
    body('name')
      .trim().notEmpty().withMessage('Name is required.')
      .isLength({ max: 100 }).withMessage('Name is too long.')
      .escape(),
    body('email')
      .optional({ checkFalsy: true })
      .trim().isEmail().withMessage('Invalid email address.')
      .normalizeEmail(),
    body('phone')
      .trim().notEmpty().withMessage('Phone number is required.')
      .matches(/^[\+\-\s\(\)\d]{7,20}$/).withMessage('Invalid phone number.'),
    body('date')
      .trim().notEmpty().withMessage('Date is required.')
      .isDate({ format: 'YYYY-MM-DD' }).withMessage('Invalid date.'),
    body('time')
      .trim().notEmpty().withMessage('Time is required.')
      .matches(/^([01]?\d|2[0-3]):[0-5]\d$/).withMessage('Invalid time format.'),
    body('guests')
      .notEmpty().withMessage('Number of guests is required.')
      .bail()
      .isInt({ min: 1, max: 50 }).withMessage('Guests must be a number between 1 and 50.'),
    body('notes')
      .optional({ checkFalsy: true })
      .trim().isLength({ max: 500 }).withMessage('Notes too long.')
      .escape(),
  ],
  handleValidation,
  async (req, res) => {
    const { name, email, phone, date, time, guests, notes } = req.body;

    // ── Persist to DB ──────────────────────────────────────────
    if (isReady()) {
      try {
        await Reservation.create({ name, email, phone, date, time, guests, notes });
      } catch (err) {
        console.error('[reservation] DB save error:', err.message);
        return res.status(500).json({ error: 'Could not save your reservation. Please try again.' });
      }
    } else {
      console.log('[reservation] (no DB)', { name, phone, date, time, guests });
    }

    // ── Send emails (non-blocking failures) ───────────────────
    await Promise.all([
      sendReservationNotification({ name, email, phone, date, time, guests, notes }),
      sendReservationConfirmation({ name, email, phone, date, time, guests, notes }),
    ]);

    res.json({ success: true, message: 'Reservation confirmed! We look forward to serving you.' });
  }
);

module.exports = router;
