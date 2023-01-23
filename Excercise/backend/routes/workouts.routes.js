// imports
const express = require("express");
const {
	getAllWorkout,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
} = require("../controllers/workouts.controller");

// Create a router
const router = express.Router();

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
