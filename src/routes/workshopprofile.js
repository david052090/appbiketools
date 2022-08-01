const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/workshopprofile", isLoggedIn, async (req, res) => {
  const workshop = await pool.query(
    "SELECT * FROM workshop WHERE user_id = ?",
    [req.user.id]
  );
  res.render("./workshop/workshopprofile", { workshop });
});

module.exports = router;
