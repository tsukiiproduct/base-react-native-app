// Express entry point. Wires together config, middleware, and routes.
// Kept as the project's "main" so existing scripts (npm start / dev) keep working.

const express = require('express');
const cors = require('cors');

const env = require('./src/config/env');
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const apiRouter = require('./src/routes');

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Quick sanity-check root
app.get('/', (req, res) => {
  res.send(
    'Backend is running. Try /api/health, /api/message, /api/config, /api/profile, /api/settings.'
  );
});

// All API routes live under /api
app.use('/api', apiRouter);

// 404 for any unmatched route
app.use((req, res, next) => {
  const err = new Error('Not found: ' + req.method + ' ' + req.originalUrl);
  err.statusCode = 404;
  err.code = 'NOT_FOUND';
  next(err);
});

// Centralized error handler (last)
app.use(errorHandler);

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('---------------------------------------------');
  console.log('Backend running on http://localhost:' + env.PORT);
  console.log('Android emulator URL: http://10.0.2.2:' + env.PORT);
  console.log('Environment: ' + env.NODE_ENV);
  console.log('Available routes:');
  console.log('  GET  /');
  console.log('  GET  /api/health');
  console.log('  GET  /api/message');
  console.log('  GET  /api/config');
  console.log('  GET  /api/profile');
  console.log('  PUT  /api/profile');
  console.log('  GET  /api/settings');
  console.log('  PUT  /api/settings');
  console.log('---------------------------------------------');
});
