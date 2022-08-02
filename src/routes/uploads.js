const { Router } = require("express");

const router = Router();

router.get("/uploadedimg", (req, res) => {
  res.render("./uploadsimg/uploadedimg");
});
module.exports = router;
/////////////////////
