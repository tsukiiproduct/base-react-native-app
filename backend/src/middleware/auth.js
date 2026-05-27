// JWT auth middleware — SCAFFOLDING ONLY.
//
// This currently no-ops (passes the request through) so the app keeps working
// before any real auth is implemented. The shape mirrors what a real JWT
// middleware would look like, so route files can already use `requireAuth`
// in their definitions and the moment we wire up real verification, every
// protected route picks it up.
//
// To activate:
//   1. `npm i jsonwebtoken`
//   2. Replace the body of requireAuth with token extraction + jwt.verify().
//   3. Set a strong JWT_SECRET in .env.

const env = require('../config/env');

function extractToken(req) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) {
    return header.slice(7);
  }
  return null;
}

function requireAuth(req, res, next) {
  const token = extractToken(req);

  // Placeholder behavior: log + pass through. No enforcement yet.
  if (!token) {
    req.user = null;
    return next();
  }

  // TODO: Replace with real verification:
  //   const jwt = require('jsonwebtoken');
  //   try {
  //     req.user = jwt.verify(token, env.JWT_SECRET);
  //     return next();
  //   } catch (err) {
  //     return res.status(401).json({ error: { message: 'Invalid token' } });
  //   }
  req.user = { id: 'placeholder-user', tokenPresent: true };
  next();
}

module.exports = { requireAuth, extractToken };
