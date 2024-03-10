const router = require("express").Router();
const { Task, User } = require("../../models");

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const taskData = await Task.findAll();
    res.json(taskData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get a single task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new task
router.post("/", async (req, res) => {
  const { title, contents, deadline, project_id, status } = req.body;

  try {
    const newTask = await Task.create({
      title, 
      contents,
      deadline,
      project_id,
      status,
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Update a tasks status by ID
const taskStatus = ["to-do", "in-progress", "completed"];

router.put("/:id", async (req, res) => {

  console.log('Task ID:', req.params.id);
  console.log('Request body:', req.body);
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      res.status(404).send("Task not found");
    }
    // Validating the incoming status update
    if (req.body.status && !taskStatus.includes(req.body.status)) {
      return res.status(400).send("Invalid Status");
    }
    // UPdate the task

    const updateTask = await task.update({
      status: req.body.status 
  });
    return res.json(updateTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    await Task.destroy({
      where: {
        task_id: req.params.task_id,
      },
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Getting taskcard by id
router.get("/:id/details", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["first", "last"],
        },
      ],
    });

    if (!task) {
      return res.status(404).send("Task not found");
    }

    res.render("taskcard", {
      layout: false,
      task: task.get({ plain: true }),
    });
  } catch (error) {
    console.error("Error fetching task details:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
