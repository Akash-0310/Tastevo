const router    = require('express').Router();
const { apiLimiter } = require('../middleware/rateLimiter');
const MenuItem  = require('../models/MenuItem');
const { isReady } = require('../db');
const { cloudinaryFetch } = require('../utils/cloudinary');

/**
 * Normalise a raw MenuItem document for the frontend:
 *  - Apply Cloudinary image optimisation
 *  - Map isNewItem → isNew (Mongoose reserved word workaround)
 *  - Strip internal fields (__v)
 */
const normalise = (item, imgOpts) => {
  const { __v, isNewItem, ...rest } = item;
  return {
    ...rest,
    isNew:  isNewItem ?? false,
    image:  cloudinaryFetch(item.image, imgOpts),
  };
};

// ── GET /api/menu ─────────────────────────────────────────────
// Returns all available items grouped by category.
// Shape: { starters: [...], mains: [...], desserts: [...], drinks: [...] }
router.get('/menu', apiLimiter, async (req, res) => {
  if (!isReady()) {
    return res.status(503).json({ error: 'Database not connected.' });
  }

  try {
    const raw = await MenuItem.find({ isAvailable: true })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();

    const items = raw.map(i => normalise(i));

    const grouped = items.reduce(
      (acc, item) => {
        if (acc[item.category]) acc[item.category].push(item);
        return acc;
      },
      { starters: [], mains: [], desserts: [], drinks: [] }
    );

    res.json({ success: true, data: grouped });
  } catch (err) {
    console.error('[menu] Fetch error:', err.message);
    res.status(500).json({ error: 'Could not load menu. Please try again.' });
  }
});

// ── GET /api/menu/featured ────────────────────────────────────
// Returns up to 4 popular items (flat array) — used by Home page.
router.get('/menu/featured', apiLimiter, async (req, res) => {
  if (!isReady()) {
    return res.status(503).json({ error: 'Database not connected.' });
  }

  try {
    const raw = await MenuItem.find({ isAvailable: true, isPopular: true })
      .sort({ sortOrder: 1 })
      .limit(4)
      .lean();

    const items = raw.map(i => normalise(i));

    res.json({ success: true, data: items });
  } catch (err) {
    console.error('[menu/featured] Fetch error:', err.message);
    res.status(500).json({ error: 'Could not load featured items.' });
  }
});

module.exports = router;
