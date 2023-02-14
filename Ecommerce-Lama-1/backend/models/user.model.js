// imports
const mongoose = require("mongoose");

// get Schema
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			minLength: [3, "Min length for the username is 3"],
			maxLength: [50, "Max charachter allowed for username is 50"],
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// create the user Model and export
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
