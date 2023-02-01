// imports
const mongoose = require("mongoose");

// Get the mongoose Schema Class
const Schema = mongoose.Schema;

// Create a workout schema
const workoutSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required !"],
		},
		reps: {
			type: Number,
			required: [true, "No. of Reps required !"],
		},
		load: {
			type: Number,
			required: [true, "Load weight required !"],
		},
		user_id: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// Create a model from the workoutSchema
const WorkoutModel = mongoose.model("Workouts", workoutSchema);

// export model
module.exports = WorkoutModel;
