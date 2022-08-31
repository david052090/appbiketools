const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

//Ruta de inicio de la aplicación
router.get("/", isNotLoggedIn, (req, res) => {
  res.render("index");
});

module.exports = router;
