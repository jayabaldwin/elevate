const router = require('express').Router();
// add routes
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
// initialise routes
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
module.exports = router;
