const express = require("express");
const router = express.Router();

const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/add", isLoggedIn, (req, res) => {
  res.render("workshop/add");
});

router.post("/add", isLoggedIn, async (req, res) => {
  const { tittle, address, phone, schedule, description, url } = req.body;
  const newWorks = {
    tittle,
    address,
    phone,
    schedule,
    description,
    url,
  };

  await pool.query("INSERT INTO workshop set ?", [newWorks]);
  req.flash("success", "Taller guardado correctamente");
  res.redirect("/workshop");
});
router.get("/", isLoggedIn, async (req, res) => {
  const workshop = await pool.query("SELECT * FROM workshop");
  res.render("workshop/list", { workshop });
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM workshop WHERE ID = ?", [id]);
  req.flash("success", "Taller eliminado correctamente");
  res.redirect("/workshop");
});
router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const workshop = await pool.query("SELECT * FROM workshop WHERE id = ?", [
    id,
  ]);
  res.render("workshop/edit", { workshop: workshop[0] });
});

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

  await pool.query("UPDATE workshop set ? WHERE id = ?", [newWorks, id]);
  req.flash("success", "Taller actualizado correctamente");
  res.redirect("/workshop");
});
module.exports = router;
