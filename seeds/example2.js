const { ExampleTwo } = require("../models");

const exampleTwoData = [{}, {}];

const seedExampleTwo = () => ExampleTwo.bulkCreate(exampleTwoData);

module.exports = seedExampleTwo;
