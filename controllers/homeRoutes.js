const router = require("express").Router();

// Initial homepage signup and login
router.get("/", async (req, res) => {
  res.render("welcome");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

// router.get("/workspace", async (req, res) => {
//   res.render("newWorkspace");
// });

// router.get("/create", async (req, res) => {
//   res.render("newWorkspace");
// });

// router.get("/join", async (req, res) => {
//   res.render("newWorkspace");
// });

// Workspace home /home

module.exports = router;
