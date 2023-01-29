// imports
const User = require("../models/user.model");

// Login User Logic
const loginUser = async (req, res) => {
	res.status(200).json({ status: "success", message: "Logged In!!" });
};

// Signup User Logic
const signupUser = async (req, res) => {
	const { email, password } = req.body;

	// try-catch because we are using static signup method
	// which might throw an error
	try {
		const user = await User.signup(email, password);

		res.status(200).json({ status: "success", user });
	} catch (error) {
		res.status(400).json({ status: "failed", error: error.message });
	}
};

module.exports = { loginUser, signupUser };
