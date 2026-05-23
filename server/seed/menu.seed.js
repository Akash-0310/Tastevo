/**
 * Menu seed script
 * Usage: npm run seed
 *
 * Inserts menu items into MongoDB if the collection is empty.
 * Safe to re-run — won't duplicate existing data.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const mongoose  = require('mongoose');
const MenuItem  = require('../models/MenuItem');
const menuItems = require('./menu.data');

const seed = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('[seed] MONGODB_URI is not set in .env');
    process.exit(1);
  }

  console.log('[seed] Connecting to MongoDB…');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('[seed] Connected');

  const existing = await MenuItem.countDocuments();
  if (existing > 0) {
    console.log(`[seed] ${existing} items already in DB — skipping insert.`);
    console.log('[seed] To reseed: clear the menuItems collection first, then re-run.');
    await mongoose.disconnect();
    return;
  }

  console.log(`[seed] Inserting ${menuItems.length} menu items…`);
  await MenuItem.insertMany(menuItems);
  console.log(`[seed] ✅ Done — ${menuItems.length} items inserted.`);

  const counts = await MenuItem.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  console.table(counts.map(c => ({ category: c._id, count: c.count })));

  await mongoose.disconnect();
};

seed().catch(err => {
  console.error('[seed] Error:', err.message);
  process.exit(1);
});
