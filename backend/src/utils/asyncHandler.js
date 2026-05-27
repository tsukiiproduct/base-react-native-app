// Wraps an async route handler so thrown errors propagate to the
// centralized errorHandler middleware via next(err).
//
// Usage:
//   router.get('/', asyncHandler(async (req, res) => { ... }));

module.exports = function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
