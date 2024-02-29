const router = require('express').Router();

// ADJUST ROUTES
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('../api', taskRoutes);

module.exports = router;
