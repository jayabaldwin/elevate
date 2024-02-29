const router = require('express').Router();
// add routes
const userRoutes = require('./userRoutes');

// initialise routes
router.use('/users', userRoutes);

module.exports = router;
