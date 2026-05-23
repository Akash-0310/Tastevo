const router  = require('express').Router();
const { body, validationResult } = require('express-validator');
const { formLimiter }  = require('../middleware/rateLimiter');
const Reservation      = require('../models/Reservation');
const { isReady }      = require('../db');
const {
  sendReservationNotification,
  sendReservationConfirmation,
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
      .notEmpty().withMessage('Number of guests is required.'),
    body('notes')
      .optional({ checkFalsy: true })
      .trim().isLength({ max: 500 }).withMessage('Notes too long.')
      .escape(),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;

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
