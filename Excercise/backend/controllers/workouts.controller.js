// imports
const mongoose = require("mongoose");

const Workout = require("../models/workouts.model");
const asyncWrapper = require("../middleware/async-wrapper");
const { createCustomError } = require("../errors/custom-error");

// Get all workouts
const getAllWorkout = asyncWrapper(async (req, res, next) => {
	const allWorkouts = await Workout.find({}).sort({ createdAt: -1 });
	res.status(200).json({ status: "success", data: allWorkouts });
});

// Get a single workouts
const getWorkout = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	// check if the id is a valid mongo id or not
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(createCustomError(`No Such Workout Exists! :  ${id}`, 404));
	}

	const workout = await Workout.findById(id);
	if (!workout) {
		return next(
			createCustomError(`Workout with id: ${id} does not exist !`, 404)
		);
	}
	res.status(200).json({ status: "success", data: workout });
});

// Create a new workouts
const createWorkout = asyncWrapper(async (req, res, next) => {
	const { title, reps, load } = req.body;

	// Empty Fields response handling
	const emptyFields = [];
	if (!title) emptyFields.push("title");
	if (!reps) emptyFields.push("reps");
	if (!load) emptyFields.push("load");
	if (emptyFields.length > 0) {
		return next(
			createCustomError(
				"Please fill in all empty fields: " + emptyFields,
				404
			)
		);
	}

	const workout = await Workout.create({ title, reps, load });
	res.status(201).json({ status: "success", data: workout });
});

// Delete a workout
const deleteWorkout = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	// check if the id is a valid mongo id or not
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(
			createCustomError(`No Such Workout id Exists! :  ${id}`, 404)
		);
	}

	const deletedWorkout = await Workout.findByIdAndDelete({ _id: id });
	if (!deletedWorkout) {
		return next(
			createCustomError(`Workout with id: ${id} does not exist !`, 404)
		);
	}
	res.status(200).json({ status: "success", data: deletedWorkout });
});

// update a workout
const updateWorkout = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	// check if the id is a valid mongo id or not
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(
			createCustomError(`No Such Workout id Exists! :  ${id}`, 404)
		);
	}

	const updateWorkout = await Workout.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		},
		{ new: true }
	);
	if (!updateWorkout) {
		return next(
			createCustomError(`Workout with id: ${id} does not exist !`, 404)
		);
	}
	res.status(200).json({ status: "success", data: updateWorkout });
});

// exports
module.exports = {
	getAllWorkout,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
