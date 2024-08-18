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
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees");

const router = Router();

router.get("/", getEmployees);

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

router.put("/:id", [], updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;
