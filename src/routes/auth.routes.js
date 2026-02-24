const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { protect, authorize } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

router.get("/users", protect, authorize("admin"), authController.getAllUsers);

module.exports = router;
