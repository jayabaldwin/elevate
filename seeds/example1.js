const { Example } = require('../models');

const exampleData = [{}, {}];

const seedExample = () => Example.bulkCreate(exampleData);

module.exports = seedExample;
