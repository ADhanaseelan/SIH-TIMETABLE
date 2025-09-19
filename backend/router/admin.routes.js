// Importing the packages
const express = require("express");

// Importing from the middleware
const { checkLogin } = require("../middleware/admin.middleware");

// Importing from the controller
const { verifyLogin } = require("../controller/admin.controller");

// Function
const router = express.Router();

// Post routes
router.post("/login", checkLogin, verifyLogin);

module.exports = router;
