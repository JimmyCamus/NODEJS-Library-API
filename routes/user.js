const { Router } = require("express");
const { check } = require("express-validator");
const { index, store, update, destroy } = require("../controllers/user");
const {
  roleValidator,
  emailValidator,
  idValidator,
} = require("../helpers/db-validators");
const {
  validateFields,
  validateJWT,
  validateRoles,
} = require("../middlewares");

const router = Router();
router.get("/", index);

router.post(
  "/",
  [
    check("name", "The name is required.").not().isEmpty(),
    check("password", "The password is required.")
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    check("email", "The email is not valid.").isEmail().custom(emailValidator),
    check("role").custom(roleValidator),
    validateFields,
  ],
  store
);

router.put(
  "/:id",
  [
    check("id", "The id isnt valid").isMongoId(),
    check("id").custom(idValidator),
    check("role").custom(roleValidator),
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
    check("id").custom(idValidator),
    validateFields,
  ],
  destroy
);

module.exports = router;
