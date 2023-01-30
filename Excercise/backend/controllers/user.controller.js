// imports
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

// Create Token Logic
const createToken = (_id) => {
	// JWT Format - header.payload.signature
	// header - contains the type of algorithm and hashing algo info
	// payload - it contains user data (does not contain sensititve info)
	// signature - used to verify the token by the server

	// JWT Theory -> After signup we send the token to the browser for the current user. And now for every request client(browser) make, it has to send the token with the request so that server can verify that the correct(authorized user) is making the request. And the server uses the signature to verify the token sent by the client and only after it is verified, the server completes the request

	/*  
	Signature theory ->
	 	1. first of all when a user sends a successful login or signup request to authenticate themselves the server generates a token. It does this by first of all making the payload and the headers part using the user's details like their unique id then it hashes both of these things - header and payload together with a secret string known only to the server it becomes a signature which is a random string of characters. Now, this unique signature for this user can only ever be made by the server because only the server knows the secret string used to make the signature so for this reason the secret string must remain a secret known only to the server because it's the key to unlocking and verifying the json web token
	
		2. So once the server's created this token, we can send it to the browser and then from the browser if we ever need to make a request for any resource that's protected, we will use the secret and hash it with the first two parts of the token the header and the payload to verify the signature. If the result of that matches the signature on the token and we know that the token hasn't been tampered with then we will provide the resource. But if they don't match then we know it's not valid and we can refuse access to the user.
		
		signature = hashof(header + payload + secret)
	*/

	// Syntax: jwt.sign(payload, secret, options)
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login User Logic
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	// try-catch because we are using static login method
	// which might throw an error
	try {
		// calling the static method login we created in user.model
		const user = await User.login(email, password);

		// create a token
		const token = createToken(user._id);

		res.status(200).json({ status: "success", email, token });
	} catch (error) {
		res.status(400).json({ status: "failed", error: error.message });
	}
};

// Signup User Logic
const signupUser = async (req, res) => {
	const { email, password } = req.body;

	// try-catch because we are using static signup method
	// which might throw an error
	try {
		// calling the static method signup we created in user.model
		const user = await User.signup(email, password);

		// create a token
		const token = createToken(user._id);

		res.status(200).json({ status: "success", email, token });
	} catch (error) {
		res.status(400).json({ status: "failed", error: error.message });
	}
};

module.exports = { loginUser, signupUser };
