/*
Route: /api/users
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { jwtValidate } = require("../middlewares/jwt-validate");

const router = Router();

router.get("/", jwtValidate, getUsers);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    jwtValidate,
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("role", "Role is required").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.delete("/:id", jwtValidate, deleteUser);

module.exports = router;
