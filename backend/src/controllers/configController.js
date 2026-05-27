const env = require('../config/env');

// Returns non-sensitive runtime config the client may need.
// Never expose secrets here.
exports.getConfig = (req, res) => {
  res.json({
    appName: 'Base App',
    apiVersion: 'v1',
    environment: env.NODE_ENV,
    featureFlags: {
      // Add boolean toggles that the client should read at startup.
      darkMode: true,
      maintenanceMode: false,
    },
  });
};
