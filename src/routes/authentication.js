const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

// Registro de usuario
router.get("/signup", isNotLoggedIn, (req, res) => {
  console.log(req.flash("error"));
  res.render("auth/signup");
});

router.post(
  "/signup",
  isNotLoggedIn,
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

// Inicio de sesión
router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("auth/login");
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local.login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

//Cierre de sesión
router.get("/logout", (req, res) => {
  req.logOut(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
