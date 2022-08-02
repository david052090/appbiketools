const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../lib/auth");

router.get("/search", isLoggedIn, async (req, res) => {
  res.render("./workshop/search");
});
module.exports = router;
