/* 
Path: '/api/login
*/

const { Router } = require("express");
const { login, loginGoogle, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { jwtValidate } = require("../middlewares/jwt-validate");

const router = Router();

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [check("token", "Token is required").not().isEmpty(), validateFields],
  loginGoogle
);

router.get("/renew", jwtValidate, renewToken);

module.exports = router;
