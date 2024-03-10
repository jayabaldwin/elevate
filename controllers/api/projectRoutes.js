const router = require('express').Router();
const { Project, Workspace, User, Task } = require('../../models');
const withAuth = require('../../utils/auth');

  router.get("/projectsList", async (req, res) => {
    const currentUser = await User.findByPk(req.session.user_id); // Assuming you have access to the current user
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
  
    try {
      const projectsInSameWorkspace = await Project.findAll({
        where: {
          workspace_id: currentUser.workspace_id
        }
      });
      if (!projectsInSameWorkspace) {
        return res.status(404).json({ message: "No projects found in the same workspace" });
      }
      // projectsInSameWorkspace contains all projects in the same workspace as the current user
      res.json(projectsInSameWorkspace);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// Opening to see users, will display all users
router.get('/', async (req, res) => {
  try {

    const projectData = await Project.findAll()

    const projects = [];

    projectData.forEach(Project => {
      const projectPlain = project.get({ plain: true });
      projects.push(projectPlain);
    });
    res.render('projects', {
      projects
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Opening to see projects, will display all projects
router.get('/', withAuth, async (req, res) => {
  try {

    const workspaceData = await Workspace.findAll({
      include: [{ model: Project, include: Task }]
    })

    const workspaces = [];

    workspaceData.forEach(workspace => {
      workspacePlain = workspace.get({ plain: true });
      workspaces.push(workspacePlain);
    });

    res.render('projects', {
      workspaces
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Selecting a project will display individual project by id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [{ model: Workspace }, { model: User, attributes: ['name'] }],
    });

    if (!projectData) {
      res
        .status(404)
        .json({ message: 'Error finding Project matching this id' });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creating new project
router.post('/', withAuth, async (req, res) => {
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