const router = require('express').Router();
// add routes
const userRoutes = require('./userRoutes');
const workspaceRoutes = require('./workspaceRoutes');
const commentRoutes = require('./commentRoutes');
const taskRoutes = require('./taskRoutes');

// initialise routes
router.use('/users', userRoutes);
router.use('/workspace', workspaceRoutes);
router.use('/comment', commentRoutes);
router.use('/task', taskRoutes);

module.exports = router;
