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

// Workspace home /home

module.exports = router;
