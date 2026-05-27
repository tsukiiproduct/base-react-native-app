// Placeholder validation schemas.
// Swap in Zod or Joi later (e.g. `npm i zod`) and re-export typed schemas here.
//
// Each export is a plain function `(payload) => { ok: boolean, errors?: string[] }`
// so call sites can stay agnostic of the validator until we pick one.

function profileUpdateSchema(payload) {
  const errors = [];
  if (payload?.displayName != null && typeof payload.displayName !== 'string') {
    errors.push('displayName must be a string');
  }
  if (payload?.email != null && typeof payload.email !== 'string') {
    errors.push('email must be a string');
  }
  return { ok: errors.length === 0, errors };
}

function settingsUpdateSchema(payload) {
  const errors = [];
  if (payload?.theme && !['light', 'dark', 'system'].includes(payload.theme)) {
    errors.push('theme must be one of: light, dark, system');
  }
  if (payload?.notificationsEnabled != null && typeof payload.notificationsEnabled !== 'boolean') {
    errors.push('notificationsEnabled must be a boolean');
  }
  return { ok: errors.length === 0, errors };
}

module.exports = {
  profileUpdateSchema,
  settingsUpdateSchema,
};
