const { Router } = require("express");
const { check } = require("express-validator");
const { update, localStore, localIndex } = require("../controllers/upload");
const { validateColection } = require("../helpers/db-validators");
const {
  validateFields,
  validateFiles,
  validateJWT,
} = require("../middlewares");

const router = Router();

router.get(
  "/:colection/:id",
  [
    check("id").isMongoId(),
    check("colection").custom((colection) =>
      validateColection(colection, ["books"])
    ),
    validateFields,
  ],
  localIndex
);

router.post(
  "/:colection/:id",
  [
    validateJWT,
    check("id").isMongoId(),
    check("colection").custom((colection) =>
      validateColection(colection, ["books"])
    ),
    validateFiles,
    validateFields,
  ],
  localStore
);

router.put(
  "/:colection/:id",
  [
    validateJWT,
    check("id").isMongoId(),
    check("colection").custom((colection) =>
      validateColection(colection, ["users", "books"])
    ),
    validateFiles,
    validateFields,
  ],
  update
);

module.exports = router;
