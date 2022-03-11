const { Router } = require("express");
const { check } = require("express-validator");
const {
  validateJWT,
  validateFields,
  validateRoles,
} = require("../middlewares");
const { index, store, update, destroy } = require("../controllers/comment");
const { bookValidator, commentValidator } = require("../helpers/db-validators");

const router = Router();

router.get(
  "/",
  [
    check("bookId").isMongoId(),
    check("bookId").custom(bookValidator),
    validateFields,
  ],
  index
);

router.post(
  "/",
  [
    validateJWT,
    check("bookId").isMongoId(),
    check("bookId").custom(bookValidator),
    check("content").not().isEmpty(),
    validateFields,
  ],
  store
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id").isMongoId(),
    check("id").custom(commentValidator),
    check("content").not().isEmpty(),
    validateFields,
  ],
  update
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id").isMongoId(),
    check("id").custom(commentValidator),
    validateFields,
  ],
  destroy
);

module.exports = router;
