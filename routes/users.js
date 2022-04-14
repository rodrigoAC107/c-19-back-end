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
} = require("../controllers/users");

/**
 * {{url}}/api/users
 */

//  Get User - public
router.get(
  "/",
  [
    check("email", "email is required").not().isEmpty().isEmail().normalizeEmail(), 
    validation
  ],
  getUser
);

//  Create User - public
router.post(
  "/",
  [
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

//  Put User - public
router.put(
  "/:id",
  [
    check("id", "Dont mongo id valid").isMongoId(),
    check("email").isEmail().normalizeEmail().custom(emailUnique),
    check("email", "email is required").not().isEmpty(),
    check("name", "name is required").not().isEmpty(),
    check("password", "password must have more than 6 characters").not().isEmpty(),
    validation,
  ],
  putUser
);

//  Delete User - public
router.delete("/:id",
  [
    check('id', 'Dont mongo id valid').isMongoId(),
    validation
  ], 
  deleteUser);

module.exports = router;
