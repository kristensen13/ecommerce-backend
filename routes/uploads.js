/*
ruta: /api/uploads/
*/

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");

const { jwtValidate } = require("../middlewares/jwt-validate");
const { uploadFile, returnImage } = require("../controllers/uploads");

const router = Router();

router.use(expressFileUpload());

router.put("/:type/:id", jwtValidate, uploadFile);

router.get("/:type/:image", returnImage);

module.exports = router;
