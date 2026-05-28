// Lightweight request logging middleware.
// Logs: timestamp, method, path, status, duration.
// Uses console only — swap for pino/winston later if needed.

module.exports = function logger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    const stamp = new Date().toISOString();
    // eslint-disable-next-line no-console
    console.log(`[${stamp}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });
  next();
};
