const router = require("express").Router();
const { User, Workspace, Task, Project } = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("welcome");
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

    const projectData = await Project.findAll({
      where: { workspace_id: user.workspace_id },
      include: [
        {
          model: Task,
        },
      ],
    });

    const allTasks = projectData.reduce((tasks, project) => {
      if (Array.isArray(project.tasks)) {
        tasks.push(...project.tasks);
      }
      return tasks;
    }, []);
    //filtering tasks by status
    const toDoTasks = allTasks.filter((task) => task.status === "to-do");
    const inProgressTasks = allTasks.filter(
      (task) => task.status === "in-progress"
    );
    const completedTasks = allTasks.filter(
      (task) => task.status === "completed"
    );

    res.render("home", {
      user: user.get({ plain: true }),
      workspace: workspaceData.get({ plain: true }),
      tasks: {
        toDo: toDoTasks.map((task) => task.get({ plain: true })),
        inProgress: inProgressTasks.map((task) => task.get({ plain: true })),
        completed: completedTasks.map((task) => task.get({ plain: true })),
      },
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

    const projectData = await Project.findAll({
      where: { workspace_id: user.workspace_id },
    });

    const projects = projectData.map((project) => project.get({ plain: true }));
    const workspace = workspaceData.get({ plain: true });

    res.render("dashboard", { workspace, projects }); // Pass workspace as an object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/projects/:id", withAuth, async (req, res) => {
  try {
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

    const workspaceData = await Workspace.findByPk(user.workspace_id);
    if (!workspaceData) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    const projectData = await Project.findByPk(req.params.id, {
      include: [{ model: Task }],
    });

    if (!projectData) {
      res
        .status(404)
        .json({ message: "Error finding Project matching this id" });
      return;
    }
    const projectDataPlain = projectData.get({ plain: true });

    res.render("home", {
      user: user.get({ plain: true }),
      workspace: workspaceData.get({ plain: true }),
      project: projectDataPlain,
      tasks: {
        toDo: projectDataPlain.tasks.filter((task) => task.status === "to-do"),
        inProgress: projectDataPlain.tasks.filter(
          (task) => task.status === "in-progress"
        ),
        completed: projectDataPlain.tasks.filter(
          (task) => task.status === "completed"
        ),
      },
    });
  } catch (err) {
    console.error("Error in route:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
