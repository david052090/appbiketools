const express = require("express");
const morgan = require("morgan");
const expressHbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const passport = require("passport");

const { database } = require("./keys");

//Inicializar
const app = express();
require("./lib/passport");

//Configuración
app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  expressHbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(
  session({
    secret: "biketoolssession",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

//Rutas
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/workshop", require("./routes/workshop"));

//Public
app.use(express.static(path.join(__dirname, "public")));

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log("Servidor en puerto", app.get("port"));
});
