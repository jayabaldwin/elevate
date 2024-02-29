const Workspace = require('./Workspace');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Comment = require('./Comment');

// ESTABLISH RELATIONSHIPS
// THESE MIGHT NEED EDITING

// Workspace
// Has many User & Group

// Project
// Has many Task

// Task
// Has many User & Comment

// Comment
// Belongs to Task
// onDelete: 'CASCADE'

module.exports = { Workspace, User, Project, Task, Comment };
