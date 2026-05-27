// Centralized error handler. Must be registered LAST (after all routes).
// Routes/controllers can `next(err)` to delegate here, or throw inside an
// async route wrapped with the asyncHandler in utils.

const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error('[error]', err.stack || err.message || err);

  const status = err.statusCode || err.status || 500;
  const payload = {
    error: {
      message: err.message || 'Internal Server Error',
      code: err.code || 'INTERNAL_ERROR',
    },
  };

  // Only expose stack traces outside production.
  if (env.NODE_ENV !== 'production' && err.stack) {
    payload.error.stack = err.stack;
  }

  res.status(status).json(payload);
};
