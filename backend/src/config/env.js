// Centralized env configuration.
// Pull all process.env reads through this module so callers don't sprinkle
// `process.env.FOO` checks everywhere. Add new vars here with sensible defaults.

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,

  // JWT scaffolding — NOT a real secret. Replace with a strong value in .env
  // and never commit the real one.
  JWT_SECRET: process.env.JWT_SECRET || 'dev-only-placeholder-change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // Toggle verbose logging in development.
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

module.exports = env;
