const { Router } = require("express");
const { check } = require("express-validator");

const {
  getLaboratories,
  storeLaboratory,
  getLaboratory,
  updateLaboratory,
  deleteLaboratory,
} = require("../controllers/laboratories");
const { validation } = require("../middlewares/validation-results");
const { route } = require("./cases");

const router = Router();

/**
 * {{url}}/api/laboratories
 */

// Get All Laboratories
router.get("/", getLaboratories);

// Get Laboratory
router.get(
  "/:id",
  [check("id", "Dont mongo id valid").isMongoId(), validation],
  getLaboratory
);

// Create Laboratory
router.post(
  "/",
  [
    check("protocol", "protocol is required").not().isEmpty(),
    check("protocol_type", "protocol type is required").not().isEmpty(),
    check("person", "person type is required").not().isEmpty(),
    check("taken", "taken type is required").not().isEmpty(),
    validation
  ],
  storeLaboratory
);

// Update Laboratory
router.put(
  '/:id', 
  [
    check('id', 'Dont mongo id valid'),
    check("protocol", "protocol is required").not().isEmpty(),
    check("protocol_type", "protocol type is required").not().isEmpty(),
    check("person", "person type is required").not().isEmpty(),
    check("taken", "taken type is required").not().isEmpty(),
    validation
  ],
  updateLaboratory
);

// Delete Laboratory
router.delete(
  '/:id', 
  [
    check('id', 'Dont mongo id valid'),
    validation
  ],
  deleteLaboratory
);

module.exports = router;
