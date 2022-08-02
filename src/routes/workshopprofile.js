const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/workshopprofile/:id", isLoggedIn, async (req, res) => {
  const workshop = await pool.query("SELECT * FROM workshop WHERE id = ?", [
    req.params.id,
  ]);
  res.render("./workshop/workshopprofile", { workshop });
});

module.exports = router;
