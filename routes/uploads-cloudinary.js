/*
ruta: /api/uploads/
*/

const { Router } = require("express");
const { jwtValidate } = require("../middlewares/jwt-validate");
const {
  uploadFile,
  returnImage,
} = require("../controllers/uploads-cloudinary");

const router = Router();
const fileUpload = require("express-fileupload");
router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

router.post("/upload/:type/:id", jwtValidate, uploadFile);

// router.post("/upload/:type/:id", jwtValidate, multerConfig, uploadFile);

router.get("/upload/:type/:image", returnImage);

module.exports = router;
