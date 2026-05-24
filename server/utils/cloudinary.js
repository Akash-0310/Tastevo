/**
 * Cloudinary image URL transformer.
 *
 * Uses Cloudinary's "fetch" delivery type — no manual upload needed.
 * Cloudinary fetches the original URL, caches it on its CDN, and
 * serves it with the applied transformations on every subsequent request.
 *
 * Setup:
 *   1. Create free account at cloudinary.com
 *   2. Dashboard → Settings → Security → enable "Fetched URLs"
 *   3. Set CLOUDINARY_CLOUD_NAME in .env
 *
 * If CLOUDINARY_CLOUD_NAME is not set, the original URL is returned unchanged.
 */

/**
 * @param {string} url          - Original image URL (e.g. Unsplash)
 * @param {object} opts
 * @param {number} opts.width   - Target width  (default 400)
 * @param {number} opts.height  - Target height (default 300)
 * @param {string} opts.crop    - Crop mode     (default 'fill')
 * @returns {string} Optimised Cloudinary URL or original URL as fallback
 */
const cloudinaryFetch = (url, { width = 400, height = 300, crop = 'fill' } = {}) => {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloud || !url) return url;

  // f_auto  → best format per browser (WebP, AVIF, etc.)
  // q_auto  → Cloudinary-chosen quality (reduces file size ~40–60%)
  const transforms = `w_${width},h_${height},c_${crop},f_auto,q_auto`;
  return `https://res.cloudinary.com/${cloud}/image/fetch/${transforms}/${url}`;
};

module.exports = { cloudinaryFetch };
