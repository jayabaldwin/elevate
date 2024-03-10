const router = require("express").Router();
const { Project, Workspace, User, Task } = require("../../models");
const withAuth = require("../../utils/auth");

// CONNECT TO PROJECT JS AND LINK UP ROUTES TO RENDER ON DASHBOARD AND SIDEBAR
// Jaya will add styling later
// Dashboard and sidebar to display all projects
// Connect post request to modal that is displayed in 2 locations (navbar and dashboard card)
router.get("/", withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll();

    const projectDataPlain = projectData.map(project => project.get({ plain: true }));

    res.render('dashboard', {
      projectDataPlain
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Selecting a project will display individual project by id
router.get('/:id', /* withAuth, */ async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id);

    if (!projectData) {
      res
        .status(404)
        .json({ message: "Error finding Project matching this id" });
      return;
    }
    projectDataPlain = projectData.get({ plain: true })

    res.status(200).json(projectData);

    // res.render('tasks', {
    //   projectDataPlain
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creating new project
router.post("/", withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      workspace_id: req.session.workspace_id
    });
    res.status(200).json(newProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
