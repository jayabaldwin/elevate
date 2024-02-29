const sequelize = require("../config/connection");
const {} = require("../models");
// add constants for all seed js files
// add constants for json data?

const seedAll = async () => {
  await sequelize.sync({ force: true });

  // await and then declare all other functions

  process.exit(0);
};

seedAll();
