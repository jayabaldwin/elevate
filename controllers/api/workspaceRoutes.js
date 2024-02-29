const router = require('express').Router();
const { Workspace } = require('../../models');
// end route is /api/workspace

// send the workplace into the database with the 'creating a workspace? button'
router.post('/', async (req, res) => {
  try {
    const workspaceData = await Workspace.create(req.body);
    res.status(201).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
