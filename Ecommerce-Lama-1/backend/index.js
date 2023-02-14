// imports
require("dotenv").config();
const express = require("express");
const { connectDb } = require("./DB/mongodb");

// get instances
const app = express();

// start server
const startServer = async () => {
	// if we are connected successfully then start the server
	// else show the error
	try {
		await connectDb(process.env.MONGO_URI);

		const PORT = process.env.PORT || 5000;
		const HOST = process.env.HOST || "localhost";
		app.listen(PORT, HOST, () => {
			console.log("Listening on PORT : ", PORT);
		});
	} catch (error) {
		console.log("Something Went Wrong...");
	}
};
startServer();
