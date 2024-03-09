const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const http = require('http');
const socketIo = require('socket.io')

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Wildcard route to direct users to a 404 page
app.get("*", (req, res) =>
  res.status(404).sendFile(path.join(__dirname, "/public/pages/404.html"))
);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on('joinProjectRoom', (projectId) => {
    // Join the room corresponding to the projectId
    socket.join(projectId);
    console.log(`User joined project room ${projectId}`);
  });

  socket.on('leaveProjectRoom', (projectId) => {
    // Leave the room corresponding to the projectId
    socket.leave(projectId);
    console.log(`User left project room ${projectId}`);
  });

  socket.on('chatMessage', ({ projectId, message }) => {
    // Emit the message to all users in the project room
    io.to(projectId).emit('message', message);
  });
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log("Now listening"));
});

