const { Router } = require("express");
const { check } = require('express-validator');

const { login } = require("../controllers/auth");
const { validation } = require("../middlewares/validation-results");

const router = Router();

router.post('/login', 
    [
      check('email', 'Email is required').isEmail().not().isEmpty(),
      check('password', 'Password is required').not().isEmpty(),
      validation
    ], 
    login
);


module.exports = router;