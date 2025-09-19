// Importing the packages
const express = require("express");

// Importing from the middleware
const { checkLogin } = require("../middleware/admin.middleware");

// Importing from the controller
const {
  verifyLogin,
  addStaff,
  viewStaff,
} = require("../controller/admin.controller");

// Importing the authentication middleware for admin
const { checkAdmin } = require("../middleware/auth.middleware");

// Function
const router = express.Router();

// Post routes without authentication middleware
router.post("/login", checkLogin, verifyLogin);

// Post routes with authentication middleware
router.post("/add-staff", checkAdmin, addStaff);

// Get routes with authentication middleware
router.get("/get-staff/:deptId", checkAdmin, viewStaff);

module.exports = router;
