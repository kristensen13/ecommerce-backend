/*
Categories route: '/api/categories'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { jwtValidate } = require("../middlewares/jwt-validate");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const router = Router();

router.get("/", getCategories);

router.post(
  "/",
  [
    jwtValidate,
    check("name", "The name of category is required").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    jwtValidate,
    check("name", "The name of category is required").not().isEmpty(),
    validateFields,
  ],
  updateCategory
);

router.delete("/:id", jwtValidate, deleteCategory);

module.exports = router;
