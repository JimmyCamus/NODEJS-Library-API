const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");
const { index } = require("../controllers/search");
const { validateColection } = require("../helpers/db-validators");

const router = Router();

router.get(
  "/:colection/:term",
  [
    check("colection").custom((colection) =>
      validateColection(colection, ["books", "categories", "users"])
    ),
    validateFields,
  ],
  index
);

module.exports = router;
