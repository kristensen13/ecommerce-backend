/*
Stores
route: '/api/stores'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { jwtValidate } = require("../middlewares/jwt-validate");
const {
  getStores,
  createStore,
  updateStore,
  deleteStore,
} = require("../controllers/stores");

const router = Router();

router.get("/", getStores);

router.post(
  "/",
  [
    jwtValidate,
    check("name", "The name of store is required").not().isEmpty(),
    validateFields,
  ],
  createStore
);

router.put(
  "/:id",
  [
    jwtValidate,
    check("name", "The name of store is required").not().isEmpty(),
    validateFields,
  ],
  updateStore
);

router.delete("/:id", jwtValidate, deleteStore);

module.exports = router;
