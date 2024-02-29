const Workspace = require('./Workspace');
const Group = require('./Group');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Comment = require('./Comment');

// User.hasMany(BlogPost);
// BlogPost.belongsTo(User, {
//   onDelete: 'CASCADE',
// });

// User.hasMany(Comment);
// Comment.belongsTo(User, {
//   onDelete: 'CASCADE',
// });

// BlogPost.hasMany(Comment);
// Comment.belongsTo(BlogPost, {
//   foreignKey: 'blogPost_id',
//   onDelete: 'CASCADE',
// });

module.exports = { Workspace, Group, User, Project, Task, Comment };
