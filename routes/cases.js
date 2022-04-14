const { Router } = require('express');
const { check } = require('express-validator');

const {
  getCases,
  storeCase,
  deleteCase,
  updateCase,
  getCase,
} = require('../controllers/cases');
const { emailUnique } = require('../middlewares/cases-validation');
const { validation } = require('../middlewares/validation-results');

const router = Router();

/**
 * {{url}}/api/cases
 */

//  Get All Cases - public
router.get('/', getCases);

//  Get All Cases - public
router.get(
  '/:id',
  [check('id', 'Dont mongo id valid').isMongoId(), validation],
  getCase
);

//  Create Case - public
router.post(
  '/',
  [
    check('email').isEmail().normalizeEmail().custom(emailUnique),
    check('email', 'email is required').not().isEmpty(),
    check('dni', 'dni is required').not().isEmpty(),
    check('name', 'name is required').not().isEmpty(),
    check('nationality', 'nationality is required').not().isEmpty(),
    check('province', 'province is required').not().isEmpty(),
    check('estate', 'estate is required').not().isEmpty(),
    check('location', 'location is required').not().isEmpty(),
    check('street', 'street is required').not().isEmpty(),
    check('postal_code', 'postal code is required').not().isEmpty(),
    check('age', 'age is required').not().isEmpty(),
    check('birthday_date', 'birthday is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    validation,
  ],
  storeCase
);

//  Update Case - public
router.put(
  '/:id',
  [
    check('id', 'No es un id de Mongo válido').isMongoId(), 
    check('email', 'email is required').not().isEmpty(),
    check('dni', 'dni is required').not().isEmpty(),
    check('name', 'name is required').not().isEmpty(),
    check('nationality', 'nationality is required').not().isEmpty(),
    check('province', 'province is required').not().isEmpty(),
    check('estate', 'estate is required').not().isEmpty(),
    check('location', 'location is required').not().isEmpty(),
    check('street', 'street is required').not().isEmpty(),
    check('postal_code', 'postal code is required').not().isEmpty(),
    check('age', 'age is required').not().isEmpty(),
    check('birthday_date', 'birthday is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    validation
  ],
  updateCase
);

//  Delete Case - public
router.delete(
  '/:id',
  [check('id', 'No es un id de Mongo válido').isMongoId(), validation],
  deleteCase
);

module.exports = router;
