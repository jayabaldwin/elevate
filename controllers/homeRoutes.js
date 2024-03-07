const router = require("express").Router();
// Import the custom middleware
const withAuth = require("../utils/auth");

// Initial homepage signup and login
router.get("/", async (req, res) => {
  res.render("welcome");
  // if condition
  // check if input condition/request condition is valid
  // based on request params/conditio/path
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/home", async (req, res) => {
  res.render("home");
});
// router.get("/home", withAuth, async (req, res) => {
//   res.render("home");
// });

router.get("/invite", async (req, res) => {
  res.render("home");
});

// router get /* generic 404 handling
// res.render404

module.exports = router;
