// imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
userSchema.statics.signup = async (email, password) => {
	// check if email already exists in db
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
const model = mongoose.Model("User", userSchema);

// exports
module.exports = model;
