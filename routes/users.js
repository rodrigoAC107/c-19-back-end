const { Router } = require("express");
const { check } = require("express-validator");

const { emailUnique } = require("../middlewares/users-validation");
const { validation } = require("../middlewares/validation-results");

const router = Router();

const {
  getUser,
  createUser,
  putUser,
  deleteUser,
  meUser,
} = require("../controllers/users");
const { tokenValidation } = require("../middlewares/token-validation");

/**
 * {{url}}/api/users
 */

// Get User Auth
router.get(
  '/me',
  [
    tokenValidation,
    validation
  ],
  meUser
)

//  Get User
router.get(
  "/",
  [
    tokenValidation,
    check("email", "email is required").not().isEmpty().isEmail().normalizeEmail(), 
    validation
  ],
  getUser
);

//  Create User
router.post(
  "/",
  [
    tokenValidation,
    check("email").isEmail().normalizeEmail().custom(emailUnique),
    check("email", "email is required").not().isEmpty(),
    check("name", "name is required").not().isEmpty(),
    check("password", "password must have more than 6 characters")
      .not()
      .isEmpty(),
    validation,
  ],
  createUser
);

//  Put User
router.put(
  "/:id",
  [
    tokenValidation,
    check("id", "Dont mongo id valid").isMongoId(),
    check("email").isEmail().normalizeEmail(),
    check("email", "email is required").not().isEmpty(),
    check("name", "name is required").not().isEmpty(),
    check("password", "password must have more than 6 characters").not().isEmpty(),
    validation,
  ],
  putUser
);

//  Delete User
router.delete("/:id",
  [
    tokenValidation,
    check('id', 'Dont mongo id valid').isMongoId(),
    validation
  ], 
  deleteUser);

module.exports = router;
