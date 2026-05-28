// Central router. Mounts each resource router under its own path prefix.
// Server mounts this whole router at /api, so endpoints become /api/<resource>.

const express = require('express');
const healthRouter = require('./health');
const messageRouter = require('./message');
const configRouter = require('./config');
const profileRouter = require('./profile');
const settingsRouter = require('./settings');

const router = express.Router();

router.use('/health', healthRouter);
router.use('/message', messageRouter);
router.use('/config', configRouter);
router.use('/profile', profileRouter);
router.use('/settings', settingsRouter);

module.exports = router;
