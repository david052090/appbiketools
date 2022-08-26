const { Router } = require("express");
const multer = require("multer");
const upload = multer();

const router = Router();
const type = upload.single("img");

router.get("/uploads", (req, res) => {
  res.render("./uploadsimg/uploadedimg");
});
router.post("/uploads", type, (req, res) => {
  console.log(req);
});
module.exports = router;
/////////////////////
