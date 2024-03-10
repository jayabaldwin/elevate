const router = require('express').Router();
// add routes
const userRoutes = require('./userRoutes');
const workspaceRoutes = require('./workspaceRoutes');
const commentRoutes = require('./commentRoutes');
const taskRoutes = require('./taskRoutes');
const projectRoutes = require('./projectRoutes');
// const taskStatusRoutes = require('./taskStatusRoutes');
const chatRoutes = require('./chatRoutes');


// initialise routes
router.use('/users', userRoutes);
router.use('/workspace', workspaceRoutes);
router.use('/comment', commentRoutes);
router.use('/tasks', taskRoutes);
router.use('/projects', projectRoutes);
router.use('/chat', chatRoutes);
// router.use('/', taskStatusRoutes);

module.exports = router;
