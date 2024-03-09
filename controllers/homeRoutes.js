const router = require("express").Router();
const { User, Workspace, Task } = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");

// Initial homepage signup and login
router.get("/", async (req, res) => {
  res.render("welcome");
  // if condition
  // check if input condition/request condition is valid
  // based on request params/conditio/path
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

//Original get /home, adding in tasks so it should generate the tasks on homepage
// router.get("/home", withAuth, async (req, res) => {
//   try {
//     const user = await User.findByPk(req.session.user_id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const workspaceData = await Workspace.findOne({
//       where: { id: user.workspace_id },
//     });
//     if (!workspaceData) {
//       return res.status(404).json({ message: "Workspace not found" });
//     }
//     const workspace = workspaceData.get({ plain: true });
//     res.render("home", { workspace }); // Pass workspace and as an object
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get("/home", withAuth, async (req, res) => {
  try {
    // Finding user data
    const user = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Task,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    //finding workspace data
    const workspaceData = await Workspace.findByPk(user.workspace_id);
    if (!workspaceData) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    //filtering tasks by status
    const toDoTasks = user.Tasks ? user.Tasks.filter(task => task.status === 'to-do') : [];
    const inProgressTasks = user.Tasks ? user.Tasks.filter(task => task.status === 'in-progress') : [];
    const completedTasks = user.Tasks ? user.Tasks.filter(task => task.status === 'completed') : [];
    
    res.render("home", {
      user: user.get({ plain: true }),
      workspace: workspaceData.get({ plain: true }),
      tasks: {
        toDo: toDoTasks.map(task => task.get({ plain: true })),
        inProgress: inProgressTasks.map(task => task.get({ plain: true })),
        completed: completedTasks.map(task => task.get({ plain: true })),
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/invite", withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const workspaceData = await Workspace.findOne({
      where: { id: user.workspace_id },
    });
    if (!workspaceData) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    const workspace = workspaceData.get({ plain: true });
    res.render("invite", { workspace }); // Pass workspace as an object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Projects also need to render here
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const workspaceData = await Workspace.findOne({
      where: { id: user.workspace_id },
    });
    if (!workspaceData) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    const workspace = workspaceData.get({ plain: true });
    res.render("dashboard", { workspace }); // Pass workspace as an object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
