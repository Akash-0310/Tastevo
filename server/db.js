const mongoose = require('mongoose');

let _ready = false;

/**
 * Connect to MongoDB.
 * If MONGODB_URI is not set, logs a warning and continues without DB
 * (all routes fall back to console.log mode).
 */
const connect = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('[db] MONGODB_URI not set — running without database. Data will not be persisted.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    _ready = true;
    console.log('[db] Connected to MongoDB Atlas');
  } catch (err) {
    console.error('[db] Connection failed:', err.message);
    console.error('[db] Check your MONGODB_URI in .env and ensure your IP is whitelisted in Atlas.');
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => {
    _ready = false;
    console.warn('[db] MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    _ready = true;
    console.log('[db] MongoDB reconnected');
  });
};

const isReady = () => _ready;

module.exports = { connect, isReady };
