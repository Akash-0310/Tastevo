const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const path    = require('path');
require('dotenv').config();

const { connect } = require('./db');

// ── Startup env check ────────────────────────────────────────
const REQUIRED_ENV = ['PORT', 'NODE_ENV'];
const missing = REQUIRED_ENV.filter(k => !process.env[k]);
if (missing.length) {
  console.error(`[startup] Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.warn('[startup] MONGODB_URI not set — data will NOT be persisted to database.');
}
if (!process.env.SMTP_USER) {
  console.warn('[startup] SMTP_USER not set — emails will NOT be sent.');
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

// ── Body parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));

// ── API routes ───────────────────────────────────────────────
app.use('/api', require('./routes/contact.route'));
app.use('/api', require('./routes/reservation.route'));
app.use('/api', require('./routes/subscribe.route'));
app.use('/api', require('./routes/menu.route'));

// ── 404 for unknown API routes ────────────────────────────────
app.use('/api', (_req, res) => {
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

// ── Connect DB then start server ──────────────────────────────
const startServer = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`[server] Running on port ${PORT} [${process.env.NODE_ENV}]`);
  });
};

startServer().catch(err => {
  console.error('[startup] Fatal error:', err.message);
  process.exit(1);
});
