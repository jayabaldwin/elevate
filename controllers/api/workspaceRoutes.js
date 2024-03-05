const router = require("express").Router();
const { Workspace, User } = require("../../models");

// send the workplace into the database with the 'creating a workspace? button'
router.post("/", async (req, res) => {
  try {
    const workspaceData = await Workspace.create(req.body);
    res.status(201).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// user will pass a join code and the workspace will be retreived
router.get("/:code", async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      where: {
        join_code: req.params.code,
      },
    });
    if (!workspace) {
      return res.status(404).json("Workspace not found");
    }
    res.json(workspace);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
