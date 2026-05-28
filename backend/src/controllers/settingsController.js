const { settingsUpdateSchema } = require('../validation/schemas');

// Placeholder in-memory settings. Replace with persistent store in real code.
let settings = {
  theme: 'system',
  notificationsEnabled: true,
  language: 'en',
};

exports.getSettings = (req, res) => {
  res.json({ settings });
};

exports.updateSettings = (req, res, next) => {
  const result = settingsUpdateSchema(req.body);
  if (!result.ok) {
    const err = new Error('Validation failed');
    err.statusCode = 400;
    err.code = 'VALIDATION_ERROR';
    err.details = result.errors;
    return next(err);
  }

  settings = { ...settings, ...req.body };
  res.json({ settings });
};
