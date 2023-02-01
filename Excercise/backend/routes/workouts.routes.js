// imports
const express = require("express");
const {
	getAllWorkout,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
} = require("../controllers/workouts.controller");
const requireAuth = require("../middleware/require-auth");

// Create a router
const router = express.Router();

// Using the requireAuth middleware for all workout routes
// This middleware will be used before accessing any of the below routes
// So, all the below mentioned path are now authenticated.
router.use(requireAuth);

// GET All Workout
router.get("/", getAllWorkout);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
