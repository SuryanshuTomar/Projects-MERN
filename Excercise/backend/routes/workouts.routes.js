// imports
const express = require("express");
const { createWorkout } = require("../controllers/workouts.controller");

// Create a router
const router = express.Router();

// GET All Workout
router.get("/", (req, res) => {
	res.json({
		message: "GET All workouts",
	});
});

// GET a single workout
router.get("/:id", (req, res) => {
	res.json({
		message: "GET a single workout",
	});
});

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", (req, res) => {
	res.json({
		message: "DELETE a workout",
	});
});

// UPDATE a workout
router.patch("/:id", (req, res) => {
	res.json({
		message: "UPDATE a workout",
	});
});

module.exports = router;
