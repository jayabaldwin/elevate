const sequelize = require('../config/connection');
const { Workspace, Comment, User, Project, Task } = require('../models');
const workspaceData = require('./workspace-seeds.json');
const commentData = require('./comment-seeds.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await Workspace.bulkCreate(workspaceData, {
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedAll();
