const jwt = require("jsonwebtoken");

const { createCustomError } = require("../errors/custom-error");
const User = require("../models/user.model");

const requireAuth = async (req, res, next) => {
	// Verify user authentication
	const { authorization } = req.headers;

	// 1. if the authorization is present with the request
	if (!authorization) {
		next(createCustomError("Authorization token required", 401));
	}

	// authorization format -> [Bearer {token}]
	// Bearer adsjfhl3w34hi9jv.aflsijuerlio23r43.dasfafsehfu[token]
	// And we want the token part
	const token = authorization.split(" ")[1];

	// 2. Verify if the token is correct
	try {
		const { _id } = jwt.verify(token, process.env.SECRET);

		// this will return us only the "_id" from the document
		// and not the whole document.
		// And we are attached it to the req object as user and pass it to
		// the next middleware function
		req.user = await User.findOne({ _id }).select("_id");
		next();
	} catch (error) {
		console.log(error);
		next(createCustomError("Request is not authorized!", 401));
	}
};

module.exports = requireAuth;
