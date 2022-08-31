const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

//Ruta agregar taller
router.get("/add", isLoggedIn, (req, res) => {
  res.render("workshop/add");
});

//Registro de taller
router.post("/add", isLoggedIn, async (req, res) => {
  const { tittle, address, phone, schedule, description, url } = req.body;
  const newWorks = {
    tittle,
    address,
    phone,
    schedule,
    description,
    url,
    user_id: req.user.id,
  };

  //Guarda Taller en la BD
  await pool.query("INSERT INTO workshop set ?", [newWorks]);
  req.flash("success", "Taller guardado correctamente");
  res.redirect("/workshop");
});

//Muestra los datos en la lista de talleres
router.get("/", isLoggedIn, async (req, res) => {
  const workshop = await pool.query(
    "SELECT * FROM workshop WHERE user_id = ?",
    [req.user.id]
  );
  res.render("workshop/list", { workshop });
});

//Borra los datos del taller en la BD
router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM workshop WHERE id = ?", [id]);
  req.flash("success", "Taller eliminado correctamente");
  res.redirect("/workshop");
});

//Edita el taller en la BD
router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const workshop = await pool.query("SELECT * FROM workshop WHERE id = ?", [
    id,
  ]);
  res.render("workshop/edit", { workshop: workshop[0] });
});

//Edita los datos de los talleres
router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { tittle, address, phone, schedule, description, url } = req.body;
  const newWorks = {
    tittle,
    address,
    phone,
    schedule,
    description,
    url,
  };

  //Actualiza los datos en la DB
  await pool.query("UPDATE workshop set ? WHERE id = ?", [newWorks, id]);
  req.flash("success", "Taller actualizado correctamente");
  res.redirect("/workshop");
});

module.exports = router;
