const { profileUpdateSchema } = require('../validation/schemas');

// Placeholder in-memory profile. Replace with DB lookup in real code.
let profile = {
  id: 'user_placeholder',
  displayName: 'Guest',
  email: null,
  createdAt: new Date().toISOString(),
};

exports.getProfile = (req, res) => {
  // In a real app: lookup by req.user.id
  res.json({ profile });
};

exports.updateProfile = (req, res, next) => {
  const result = profileUpdateSchema(req.body);
  if (!result.ok) {
    const err = new Error('Validation failed');
    err.statusCode = 400;
    err.code = 'VALIDATION_ERROR';
    err.details = result.errors;
    return next(err);
  }

  profile = {
    ...profile,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  res.json({ profile });
};
