const router    = require('express').Router();
const { apiLimiter } = require('../middleware/rateLimiter');
const MenuItem  = require('../models/MenuItem');
const { isReady } = require('../db');

/**
 * GET /api/menu
 * Returns all available menu items grouped by category.
 * Shape: { starters: [...], mains: [...], desserts: [...], drinks: [...] }
 *
 * Falls back to empty categories if DB is not connected —
 * the frontend still uses its hardcoded data in Phase 2 (Phase 3 switches to this).
 */
router.get('/menu', apiLimiter, async (req, res) => {
  if (!isReady()) {
    return res.status(503).json({ error: 'Database not connected.' });
  }

  try {
    const items = await MenuItem.find({ isAvailable: true })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();

    const grouped = items.reduce(
      (acc, item) => {
        const cat = item.category;
        if (acc[cat]) acc[cat].push(item);
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

module.exports = router;
