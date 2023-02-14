// imports
const router = require("express").Router();
const CryptoJs = require("crypto-js");
const UserModel = require("../models/user.model");

// Register
router.post("/register", async (req, res, next) => {
	// get the user register info from the request object
	const { username, email, password } = req.body;

	try {
		const createdUser = await UserModel.create({
			username,
			email,
			// encryting password using cryptojs AES algorithm
			password: CryptoJs.AES.encrypt(
				password,
				process.env.PASS_SECRET
			).toString(),
		});
		res.status(201).json(createdUser);
	} catch (error) {
		res.status(500).json(error);
	}
});

// Login
router.post("/login", async (req, res) => {
	// get the user login info from the request object
	const { username, password: providedPassword } = req.body;

	try {
		const loggedUser = await UserModel.findOne({ username });

		// if there is no user found then send the response
		if (!loggedUser) {
			res.status(401).json("Wrong credentials");
			return;
		}

		const hashedPassword = CryptoJs.AES.decrypt(
			loggedUser.password,
			process.env.PASS_SECRET
		);

		const decryptedPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

		// if the provided password does not match with the decrypted password
		// then send the response
		if (providedPassword != decryptedPassword) {
			res.status(401).json("Wrong credentials");
			return;
		}

		// Note: Never sent the password or reveal it to the user
		const { password, ...restUserData } = loggedUser._doc;

		res.status(201).json(restUserData);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
