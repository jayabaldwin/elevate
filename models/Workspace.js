const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workspace extends Model {}

Workspace.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'workspace',
  }
);

module.exports = Workspace;
