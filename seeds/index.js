const sequelize = require('../config/connection');
const { Workspace, Comment, User, Project, Task, TaskUser, ProjectUser, ChatLine } = require('../models');
const workspaceData = require('./workspace-seeds.json');
const commentData = require('./comment-seeds.json');
const projectData = require("./project-seeds.json");
const userData = require("./user-seeds.json");
const taskData = require("./task-seeds.json");
const taskUserData = require("./taskUser-seeds.json");
const projectUserData = require("./projectUser-seeds.json");
const chatLineData = require('./chatLine-seeds.json');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  const workspaces = await Workspace.bulkCreate(workspaceData, {
    returning: true,
  });

  await Project.bulkCreate(projectData, {
    returning: true,
  });

  await Task.bulkCreate(taskData, {
    returning: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await ProjectUser.bulkCreate(projectUserData, {
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    returning: true,
  });


  await TaskUser.bulkCreate(taskUserData, {
    returning: true,
  });

  await ChatLine.bulkCreate(chatLineData, {
    returning: true,
  })

  process.exit(0);
};

seedAll();
