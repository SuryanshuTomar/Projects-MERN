// imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

// Static Signup Method
userSchema.statics.signup = async function (email, password) {
	// Email And Password Validation
	// 1. check if email and password are not empty
	if (!email || !password) {
		throw new Error("All fields must be filled!");
	}

	// 2. validate email
	if (!validator.isEmail(email)) {
		throw new Error("Email is not Valid!");
	}

	// 2. validate password
	if (!validator.isStrongPassword(password)) {
		throw new Error("Password is not strong enough!");
	}

	// Check if email already exists in db
	const emailExist = await this.findOne({ email });
	if (emailExist) throw new Error("email already exists!");

	// Password hashing
	// 1. Generate Salt
	const salt = await bcrypt.genSalt(10); // genSalt(cost of salt)

	// 2. Hash user password with salt
	const hash = await bcrypt.hash(password, salt);

	// Create the document with user email and hashed password
	const user = await this.create({ email, password: hash });

	// return the user
	return user;
};

// Create a model from the userSchema
const model = mongoose.model("User", userSchema);

// exports
module.exports = model;
