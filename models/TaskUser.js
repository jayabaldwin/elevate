const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TaskUser extends Model { }

// Intermediary model for storing the associations between Task and User.
TaskUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    task_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'task',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'task_user',
  }
);

module.exports = TaskUser;
