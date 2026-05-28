const env = require('../config/env');

exports.getHealth = (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
};
