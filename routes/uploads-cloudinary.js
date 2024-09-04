/*
ruta: /api/uploads/
*/

const { Router } = require("express");
const { jwtValidate } = require("../middlewares/jwt-validate");
const {
  uploadFile,
  returnImage,
} = require("../controllers/uploads-cloudinary");
const multerConfig = require("../middlewares/multerConfig");

const router = Router();

router.post("/upload/:type/:id", jwtValidate, multerConfig, uploadFile);

router.get("/upload/:type/:image", returnImage);

module.exports = router;
