/*
Products route: '/api/products'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { jwtValidate } = require("../middlewares/jwt-validate");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = Router();

router.get("/", getProducts);

router.post(
  "/",
  [
    jwtValidate,
    check("name", "The name of product is required").not().isEmpty(),
    check("category", "The category of product is required").not().isEmpty(),
    validateFields,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    jwtValidate,
    check("name", "The name of product is required").not().isEmpty(),
    check("category", "The category of product is required").not().isEmpty(),
    validateFields,
  ],
  updateProduct
);

router.delete("/:id", jwtValidate, deleteProduct);

module.exports = router;
