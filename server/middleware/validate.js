const { validationResult } = require('express-validator');

/**
 * Express middleware: if any express-validator checks failed, respond with the
 * first error message and a 422. Otherwise pass control to the route handler.
 *
 * Extracted from the individual route files (contact, reservation, subscribe)
 * so validation behaviour stays consistent across every form endpoint.
 */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next();
};

module.exports = handleValidation;
