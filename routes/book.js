const { Router } = require("express");
const { check } = require("express-validator");
const {
  validateJWT,
  validateFields,
  validateRoles,
  validateFiles,
} = require("../middlewares");
const { index, show, store, update, destroy } = require("../controllers/book");
const {
  categoryValidator,
  bookValidator,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", index);

router.get(
  "/:id",
  [check("id").isMongoId(), check("id").custom(bookValidator), validateFields],
  show
);

router.post(
  "/",
  [
    validateJWT,
    check("name").not().isEmpty(),
    check("author").not().isEmpty(),
    check("category").isMongoId(),
    check("category").custom(categoryValidator),
    validateFiles,
    validateFields,
  ],
  store
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id").isMongoId(),
    check("id").custom(bookValidator),
    check("name").not().isEmpty(),
    validateFields,
  ],
  update
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateRoles("ADMIN_ROLE"),
    check("id", "The id isnt valid").isMongoId(),
    check("id").custom(bookValidator),
    validateFields,
  ],
  destroy
);

module.exports = router;
