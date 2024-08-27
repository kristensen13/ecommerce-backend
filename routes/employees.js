/*
Employee
route: '/api/employees'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { jwtValidate } = require("../middlewares/jwt-validate");
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees");

const router = Router();

router.get("/", jwtValidate, getEmployees);

router.post(
  "/",
  [
    jwtValidate,
    check("name", "The name of employee is required").not().isEmpty(),
    check("store", "The store ID must be valid.").isMongoId(),
    validateFields,
  ],
  createEmployee
);

router.put(
  "/:id",
  [
    jwtValidate,
    check("name", "The name of employee is required").not().isEmpty(),
    check("store", "The store ID must be valid.").isMongoId(),
    validateFields,
  ],
  updateEmployee
);

router.delete("/:id", jwtValidate, deleteEmployee);

router.get("/:id", jwtValidate, getEmployeeById);

module.exports = router;
