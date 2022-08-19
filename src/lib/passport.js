const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("./helpers");
//Ingreso de usuario//
passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido " + user.username));
        } else {
          done(null, false, req.flash("message", "Contrasena incorrecta"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "Este usuario no existe.")
        );
      }
    }
  )
);
//Registrar Usuario//
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname, id_cd, email } = req.body;
      let newUser = {
        fullname,
        id_cd,
        email,
        username,
        password,
      };
      try {
        // Guardando en la base de datos//
        newUser.password = await helpers.encryptPassword(password);
        const result = await pool.query("INSERT INTO users SET ? ", newUser);
        newUser.id = result.insertId;
        return done(null, newUser);
      } catch (error) {
        console.log("error catch", error);
        return done(
          null,
          false,
          req.flash(
            "message",
            "Los datos de este usuario ya estan registrados."
          )
        );
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
