const { Router } = require("express");
const { check } = require("express-validator");
const {
  validateJWT,
  validateFields,
  validateRoles,
} = require("../middlewares");
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/category");
const { categoryValidator } = require("../helpers/db-validators");

const router = Router();

router.get("/", index);

router.get(
  "/:id",
  [
    check("id").isMongoId(),
    check("id").custom(categoryValidator),
    validateFields,
  ],
  show
);

router.post(
  "/",
  [validateJWT, check("name").not().isEmpty(), validateFields],
  store
);

router.put(
  "/:id",
  [
    validateJWT,
    validateRoles("ADMIN_ROLE"),
    check("id").isMongoId(),
    check("id").custom(categoryValidator),
    check("name").not().isEmpty(),
    validateFields,
  ],
  update
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id").isMongoId(),
    check("id").custom(categoryValidator),
    validateFields,
  ],
  destroy
);

module.exports = router;
