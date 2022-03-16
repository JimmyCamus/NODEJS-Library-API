const { Router } = require("express");
const { check } = require("express-validator");
const { login, validate } = require("../controllers/auth");
const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.get("/", [validateJWT], validate);

router.post(
  "/login",
  check("email").isEmail(),
  check("password").not().isEmpty(),
  validateFields,
  login
);

module.exports = router;
