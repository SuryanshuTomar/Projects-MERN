// imports
const express = require("express");
const { loginUser, signupUser } = require("../controllers/user.controller");

// Create a router
const router = express.Router();

// Login Route
router.post("/login", loginUser);

// Sign-Up Route
router.post("/signup", signupUser);

// Exports
module.exports = router;
