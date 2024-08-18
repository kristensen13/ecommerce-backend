/*
Route: api/todo/
*/

const { Router } = require("express");
const { jwtValidate } = require("../middlewares/jwt-validate");
const { getTodo, getDocumentsCollection } = require("../controllers/searches");

const router = Router();

router.get("/:search", jwtValidate, getTodo);

router.get("/collection/:table/:search", jwtValidate, getDocumentsCollection);

module.exports = router;
