const router = require("express").Router();
const { User } = require("../../models");

router.get("/usersList", async (req, res) => {
  const currentUser = await User.findByPk(req.session.user_id); // Assuming you have access to the current user
if (!currentUser) {
  return res.status(404).json({ message: "User not found" });
}
try {
  const usersInSameWorkspace = await User.findAll({
    where: {
      workspace_id: currentUser.workspace_id
    }
  });
  if (!usersInSameWorkspace) {
    return res.status(404).json({ message: "No users found in the same workspace" });
  }
  // usersInSameWorkspace contains all users in the same workspace as the current user
  res.json(usersInSameWorkspace);
} catch (error) {
  res.status(500).json({ message: "Internal server error" });
}
});

// Opening to see users, will display all users
router.get('/', async (req, res) => {
  try {

    const userData = await User.findAll()

    const users = [];

    userData.forEach(User => {
      const userPlain = User.get({ plain: true });
      users.push(userPlain);
    });

    res.render('users', {
      users
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/current", async (req, res) => {
  if (req.session.logged_in) {
    const userData = await User.findOne({
      where: { id: req.session.user_id },
    });
    res.status(200).json(userData);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
