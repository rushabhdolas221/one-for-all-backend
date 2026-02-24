const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/property.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

// Create property (Owner only)
router.post(
  "/",
  protect,
  authorize("owner", "admin"),
  propertyController.createProperty
);

// Get all properties (Public)
router.get("/", propertyController.getAllProperties);

// Get single property
router.get("/:id", propertyController.getPropertyById);

// Update property (Owner/Admin)
router.put(
  "/:id",
  protect,
  authorize("owner", "admin"),
  propertyController.updateProperty
);

// Delete property (Owner/Admin)
router.delete(
  "/:id",
  protect,
  authorize("owner", "admin"),
  propertyController.deleteProperty
);

module.exports = router;
