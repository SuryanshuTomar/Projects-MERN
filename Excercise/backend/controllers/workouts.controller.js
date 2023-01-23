// imports
const Workout = require("../models/workouts.model");

// Get all workouts

// Get a single workouts

// Create a new workouts
const createWorkout = async (req, res) => {
	const { title, reps, load } = req.body;

	try {
		const workout = await Workout.create({ title, reps, load });
		res.status(201).json(workout);
	} catch (error) {
		res.status(400).json({ status: "failed", error: error.message });
	}
};

// Delete a workout

// update a workout

// exports
module.exports = { createWorkout };
