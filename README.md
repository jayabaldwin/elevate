<br>
  <h1 align="center">Elevate: Enhanced Task Management Software</h1>

## Description

Elevate is a powerful and intuitive task management software designed to help individuals and teams create, organise, prioritise and track their tasks efficiently.

### Application Features:
- Sign up and Sign in 
- Set up organisation name
- Set up workspaces
- Team can be invited into workspaces
- Create projects within workspaces
- View different projects assigned to the workspace
- Create tasks within these projects
- Tasks organised by status: to-do, in-progress, completed
- View tasks title, description and deadline.
- Tasks can be dragged and dropped into different status columns
- Chat section
- Logout


### Brief functionality walk through:

![Badge](https://img.shields.io/badge/License-MIT-yellow.svg) ![JavaScript](https://img.shields.io/badge/JavaScript-red) ![Node.js](https://img.shields.io/badge/Node.js-blue) ![Express.js@4.18.2](https://img.shields.io/badge/Express.js@4.18.2-lightgreen) ![Express Session@3.1.0](https://img.shields.io/badge/ExpressSession@3.1.0-pink) ![Express Handlebars@1.18.0](https://img.shields.io/badge/ExpressHandlebars@1.18.0-yellow) ![MySQL2@3.9.1](https://img.shields.io/badge/MySQL2@3.9.1-purple) ![Sequelize@6.37.1](https://img.shields.io/badge/Sequelize@6.37.1-lightblue) ![ConnectSessionSequelize@7.1.7](https://img.shields.io/badge/ConnectSessionSequelize@7.1.7-lavender) ![Bcrypt@5.1.1](https://img.shields.io/badge/Bcrypt@5.1.1-red) ![Dotenv@16.4.4](https://img.shields.io/badge/Dotenv@16.4.4-blue)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Authors](#authors)
- [GitHub Repository](#github-repository)
- [Deployed Application](#deployed-application)

## Technologies Used

- JavaScript
- Node.js
- Express.js (4.17.1)
- Express Session (1.18.0)
- Handlebars (4.7.3)
- Express Handlebars (3.1.0)
- MySQL2 (2.1.0)
- Sequelize (6.37.1)
- Connect Session Sequelize (7.1.7)
- Bcrypt (5.1.1)
- Dotenv (8.2.0)
- Socket.IO (4.7.4)
- SortableJS (1.15.2)
- Nodemailer (6.9.11)
- ESLint (8.57.0)

## Installation

`npm init -y`: create a package.json file
<br>
`npm install`: install dependencies

### Dependencies

`npm i express`: back end web application framework to build the RESTful APIs
<br>
`npm i express-session`: middleware module in Express. js that allows you to create sessions in your web application
<br>
`npm i express-handlebars`: logicless templating languages that renders web pages to the client side from data on the server side
<br>
`npm i mysql2`: database management system
<br>
`npm i sequelize`: node.js-based Object Relational Mapper, that simplifies interacting with SQL
<br>
`npm i connect-session-sequelize`: add authentication
<br>
`npm i bcrypt`: a library to hash passwords
<br>
`npm i dotenv`: protection of sensitive information
<br>
`npm i socket.io`: Chat feature
<br>
`npm i sortablejs`: Allows items to dragged and dropped within a list
<br>
`npm i nodemailer: Allows emails to be sent to server
<br>
`npm i eslint`: identifies issues with patterns within code
<br>

## User Story
AS a PERSON who works collaboratively with others
I WANT a management website
SO THAT I can create workspaces, invite others to join workspaces, create projects, view projects, create tasks and organise tasks

## Acceptance Criteria

- GIVEN Elevate is a company management web application
- WHEN I view the login page
- THEN I can sign in or sign up
- WHEN I sign up
- THEN I can sign up providing details
- WHEN I have signed up
- THEN I am prompted to create or join a workspace
- WHEN I create a workspace
- THEN I see a workspace code and am able to invite team members
- WHEN I sign in 
- THEN I see the dashboard with the projects
- WHEN I create project
- THEN I see the new project is created, with it's title and description
- WHEN I view the side bar
- THEN I see Users, Projects and Chat
- WHEN I click on Users
- THEN I see the users in that workspace
- WHEN I click Projects
- THEN I see all the projects assigned to this workspace
- WHEN I click Chat
- THEN I can chat with team members
- WHEN I click on a project
- THEN I am taken to the project page and will see the tasks with their title, contents and deadline, and the tasks will be organised into To Do, In Progress and Done
- WHEN I drag a task into the different columns
- THEN I see the task's status is updated and saved to that column
- WHEN I view another project
- THEN I see the tasks for that project
- WHEN I click logout
- THEN I am logged out and taken back to the log in page

## Usage

- To use this application follow the steps below:
<br>

- If you're a New User, begin by signing up by clicking 'Create or join a workspace? Sign Up' to sign up. 
- Fill in the necessary details, first name and last name, email, username, password and confirm password. 
- Then you will be prompted to either Create or Join a Workspace. 
<br>

- To Create Workspace: Enter in the workspace name and click 'Create'. 
- Next, send out invites and save the workspace code to add users. 
- Finally click the Workspace name to view the workspace.
- See below 'Managing Projects' for the next steps
<br>

- To join workspace: Enter in the workspace code then click 'Join Workspace' 
- See below 'Managing Projects' for the next steps
<br>

- If you already have an account click 'Already a member? Login'. And sign in.
<br>

- Managing Projects: Once you've entered the workspace dashboard, you may either create or view projects.
- To create a project, click 'Add Project' and enter in the Title and Description then click 'Add'.
- Using the side bar you can see all the Users and Projects in the workspace as well as a Chat feature.
- In the side bar, navigate to the project, where you can add and see tasks. 
- To add a task to the project: Click 'Add Item', and provide the title, description and deadline, then click 'Add'.
- You can manage the tasks by drag and dropping them into the relevant status columns: To Do, In Progress and Done.
- To view another project, navigate through the side bar to another project. 
<br>

- Finally to log out, click the log out button and you will be taken back to the login page.

## License

The application is covered under the following license: [MIT](https://opensource.org/licenses/MIT)

## Contributing
- Many Internet Resources
- Class + Teacher Material/Resources
- SortableJS: https://sortablejs.github.io/Sortable/
- Socket.io: https://socket.io/get-started/chat

## Authors

- Jaya Baldwin: [GitHub](https://github.com/jayabaldwin)
- Adam Isitmez: [GitHub](https://github.com/AdamIsitmez)
- Amir Tara: [GitHub](https://github.com/Bjorn-Ironsidee)
- Harry Potter: [GitHub](https://github.com/HarryP-GitHub)

## GitHub Repository

[GitHub Repository](https://github.com/jayabaldwin/elevate)

## Deployed Application

[Elevate]()

<!-- Add further readme items -->
