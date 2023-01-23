// imports
const mongoose = require("mongoose");
const Workout = require("../models/workouts.model");

// Get all workouts
const getAllWorkout = async (req, res) => {
	try {
		const allWorkouts = await Workout.find({}).sort({ createdAt: -1 });
		res.status(200).json({ status: "success", data: allWorkouts });
	} catch (error) {
		res.status(400).json({ status: "failed", error: error.message });
	}
};

// Get a single workouts
const getWorkout = async (req, res) => {
	const { id } = req.params;

	// check if the id is a valid mongo id or not
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({
			status: "failed",
			error: `No Such Workout Exists! :  ${id}`,
		});
	}

	try {
		const workout = await Workout.findById(id);
		if (!workout) {
			return res.status(404).json({
				status: "failed",
				error: `Workout with id: ${id} does not exist !`,
			});
		}
		res.status(200).json({ status: "success", data: workout });
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error: error.message,
		});
	}
};

// Create a new workouts
const createWorkout = async (req, res) => {
	const { title, reps, load } = req.body;

	try {
		const workout = await Workout.create({ title, reps, load });
		res.status(201).json({ status: "success", data: workout });
	} catch (error) {
		res.status(404).json({ status: "failed", error: error.message });
	}
};

// Delete a workout
const deleteWorkout = async (req, res) => {
	const { id } = req.params;

	// check if the id is a valid mongo id or not
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({
			status: "failed",
			error: `No Such Workout Exists! :  ${id}`,
		});
	}

	try {
		const deletedWorkout = await Workout.findByIdAndDelete({ _id: id });
		if (!deletedWorkout) {
			return res.status(404).json({
				status: "failed",
				error: `Workout with id: ${id} does not exist !`,
			});
		}
		res.status(200).json({ status: "success", data: deletedWorkout });
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error: error.message,
		});
	}
};

// update a workout
const updateWorkout = async (req, res) => {
	const { id } = req.params;

	// check if the id is a valid mongo id or not
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({
			status: "failed",
			error: `No Such Workout Exists! :  ${id}`,
		});
	}

	try {
		const updateWorkout = await Workout.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{ new: true }
		);
		if (!updateWorkout) {
			return res.status(404).json({
				status: "failed",
				error: `Workout with id: ${id} does not exist !`,
			});
		}
		res.status(200).json({ status: "success", data: updateWorkout });
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error: error.message,
		});
	}
};

// exports
module.exports = {
	getAllWorkout,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
