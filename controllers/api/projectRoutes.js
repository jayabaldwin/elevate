const router = require("express").Router();
const { Project, Workspace, User, Task } = require("../../models");
const withAuth = require("../../utils/auth");

// CONNECT TO PROJECT JS AND LINK UP ROUTES TO RENDER ON DASHBOARD AND SIDEBAR
// Jaya will add styling later
// Dashboard and sidebar to display all projects
// Connect post request to modal that is displayed in 2 locations (navbar and dashboard card)
router.get("/", withAuth, async (req, res) => {
  try {
    const workspaceData = await Workspace.findAll({
      include: [{ model: Project, include: Task }],
    });

    const workspaces = [];

    workspaceData.forEach((workspace) => {
      workspacePlain = workspace.get({ plain: true });
      workspaces.push(workspacePlain);
    });

    res.render("dashboard", {
      workspaces,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Selecting a project will display individual project by id
router.get("/:id", withAuth, async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [{ model: Workspace }, { model: User, attributes: ["name"] }],
    });

    if (!projectData) {
      res
        .status(404)
        .json({ message: "Error finding Project matching this id" });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creating new project
router.post("/", withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      workspace_id: req.session.workspace_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newProject);
  } catch (err) {
    res.json(500).json(err);
  }
});

module.exports = router;
