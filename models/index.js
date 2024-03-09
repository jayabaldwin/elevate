const Workspace = require('./Workspace');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Comment = require('./Comment');
const TaskUser = require('./TaskUser');
const ProjectUser = require('./ProjectUser');
const ChatLine = require('./ChatLine');



// ESTABLISH RELATIONSHIPS

// Workspace
// Has many Project
// Has many Users
Workspace.hasMany(Project, {
    foreignKey: 'workspace_id'
});

Workspace.hasMany(User, {
    foreignKey: 'workspace_id'
});

// Project
// belongs to one Workspace
// has many Tasks

Project.belongsTo(Workspace, {
    foreignKey: 'workspace_id'
});

Project.hasMany(Task, {
    foreignKey: 'project_id'
});

Project.belongsToMany(User, {
    through: ProjectUser, foreignKey: 'project_id'
})

Project.hasMany(ChatLine, {
    foreignKey: 'user_id'
})

// Task
// Belongs to one Project
// Has many User
// has many Comment

Task.belongsTo(Project, {
    foreignKey: 'project_id'
});

Task.belongsToMany(User, {
    through: TaskUser
});

Task.hasMany(Comment, {
    foreignKey: 'task_id'
});

// User
// belongs to one workspace
// Has many Tasks
// Has many Comment

User.belongsTo(Workspace, {
    foreignKey: 'workspace_id'
});

User.belongsToMany(Task, {
    through: TaskUser
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

User.belongsToMany(Project, {
    through: ProjectUser, foreignKey: 'user_id'
})

User.hasMany(ChatLine, {
    foreignKey: 'user_id'
})

// Comment
// Belongs to one Task
// Belongs to one User
// onDelete: 'CASCADE'

Comment.belongsTo(Task, {
    foreignKey: 'task_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// ChatLine
// Belongs to one Project
// Belongs to one User

ChatLine.belongsTo(Project, {
    foreignKey: 'project_id'
})

ChatLine.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = { Workspace, User, Project, Task, Comment, TaskUser, ProjectUser, ChatLine };
