const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const path       = require('path');
require('dotenv').config();

// ── Startup env check ────────────────────────────────────────
const REQUIRED_ENV = ['PORT', 'NODE_ENV'];
const missing = REQUIRED_ENV.filter(k => !process.env[k]);
if (missing.length) {
  console.error(`[startup] Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security headers ─────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ── Body parsing — 10 kb cap to prevent large-payload attacks ─
app.use(express.json({ limit: '10kb' }));

// ── Rate limiters ─────────────────────────────────────────────
// General API: 20 requests per 15 min per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

// Strict: 5 form submissions per hour per IP (contact / reservation)
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please wait before trying again.' },
});

// ── Validation helper ─────────────────────────────────────────
const validate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ error: errors.array()[0].msg });
    return false;
  }
  return true;
};

// ── Contact form ──────────────────────────────────────────────
app.post(
  '/api/contact',
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
  (req, res) => {
    if (!validate(req, res)) return;
    const { name, email, phone, message } = req.body;
    // TODO Phase 2: save to DB + send email via Nodemailer
    console.log('[contact]', { name, email, phone: phone || 'N/A' });
    res.json({ success: true, message: 'Thank you! We will get back to you soon.' });
  }
);

// ── Newsletter subscription ───────────────────────────────────
app.post(
  '/api/subscribe',
  apiLimiter,
  [
    body('email')
      .trim().isEmail().withMessage('A valid email address is required.')
      .normalizeEmail(),
  ],
  (req, res) => {
    if (!validate(req, res)) return;
    const { email } = req.body;
    // TODO Phase 2: store in DB
    console.log('[subscribe]', email);
    res.json({ success: true, message: 'Successfully subscribed to our newsletter!' });
  }
);

// ── Reservation ───────────────────────────────────────────────
app.post(
  '/api/reserve',
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
      .matches(/^([01]?\d|2[0-3]):[0-5]\d$/).withMessage('Invalid time.'),
    body('guests')
      .notEmpty().withMessage('Number of guests is required.'),
    body('notes')
      .optional({ checkFalsy: true })
      .trim().isLength({ max: 500 }).withMessage('Notes too long.')
      .escape(),
  ],
  (req, res) => {
    if (!validate(req, res)) return;
    const { name, email, phone, date, time, guests, notes } = req.body;
    // TODO Phase 2: save to DB + send confirmation email
    console.log('[reservation]', { name, email: email || 'N/A', phone, date, time, guests, notes: notes || 'None' });
    res.json({ success: true, message: 'Reservation confirmed! We look forward to serving you.' });
  }
);

// ── 404 for unknown API routes ────────────────────────────────
app.use('/api/*', (_req, res) => {
  res.status(404).json({ error: 'API endpoint not found.' });
});

// ── Global error handler ──────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[server error]', err.message);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

// ── Static files (production) ─────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[server] Running on port ${PORT} [${process.env.NODE_ENV}]`);
});
