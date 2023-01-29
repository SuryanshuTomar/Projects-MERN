// imports
const mongoose = require("mongoose");

// Get the mongoose Schema Class
const Schema = mongoose.Schema;

// Create a user schema
const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "email is required!"],
		unique: [true, "email already exists in our DB"],
	},
	password: {
		type: String,
		required: [true, "password is required!"],
	},
});

// Create a model from the userSchema
const model = mongoose.Model("User", userSchema);

// exports
module.exports = model;
