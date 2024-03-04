const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model { }

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'project',
        key: 'id',
      },
    },
    workspace_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'workspace',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('to-do', 'in-progress', 'completed'),
      allowNull: false,
      defaultValue: 'to-do',
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'task',
  }
);

module.exports = Task;
