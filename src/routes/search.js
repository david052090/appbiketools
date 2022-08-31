const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../lib/auth");

//Ruta de acceso a mapa de geolocalización
router.get("/search", isLoggedIn, async (req, res) => {
  res.render("./workshop/search");
});
module.exports = router;
