import mongoose from "mongoose";

// Get the Schema class from the mongoose
const { Schema } = mongoose;

// Create the Transaction Schema
const transactionSchema = new Schema(
	{
		amount: {
			type: Number,
			require: [true, "Amount can not be Empty!!"],
			min: [0, "Amount cannot be negative !!"],
		},
		description: {
			type: String,
			require: [true, "Description can not be Empty !!"],
			minLength: [3, "Description is too short..."],
			maxLength: [
				100,
				"Description can not be more than 100 Charachters...",
			],
		},
		date: {
			type: Date,
			default: Date.now,
			require: [true, "Date can not be Empty !!"],
		},
	},
	{ timestamps: true }
);

// Create the model using the transactionSchema
export const transactionModel = new mongoose.model(
	"Transaction",
	transactionSchema
);
