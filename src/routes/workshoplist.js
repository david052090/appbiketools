const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/workshoplist", isLoggedIn, async (req, res) => {
  const workshop = await pool.query("SELECT * FROM workshop");
  res.render("./workshop/workshoplist", { workshop });
});
module.exports = router;
