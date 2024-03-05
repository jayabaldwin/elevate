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

// will add the logged in user to the workspace with the passed id
router.put("/add-user/:id", async (req, res) => {
  try {
    await User.update(
      { workspace_id: req.params.id },
      {
        where: {
          id: req.session.user_id,
        },
      }
    );
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
