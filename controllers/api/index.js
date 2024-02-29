const router = require('express').Router();
// add routes
const userRoutes = require('./userRoutes');
const workspaceRoutes = require('./workspaceRoutes');

// initialise routes
router.use('/users', userRoutes);
router.use('/workspace', workspaceRoutes);

module.exports = router;
