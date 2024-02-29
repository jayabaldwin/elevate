const sequelize = require('../config/connection');
const { Workspace } = require('../models');
const workspaceData = require('./workspace-seeds.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await Workspace.bulkCreate(workspaceData, {
    returning: true,
  });

  process.exit(0);
};

seedAll();
