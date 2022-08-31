const { Router } = require("express");
const multer = require("multer");
const router = Router();
const upload = multer({ dest: "./public/uploads/" });
var type = upload.single("img");
router.get("/uploads", (req, res) => {
  res.render("./uploadsimg/uploadedimg");
});
router.post(
  "./public/uploads",
  upload.single("img"),
  function (req, res, next) {
    res.send("imagen cargada");
  }
);
module.exports = router;
/////////////////////
