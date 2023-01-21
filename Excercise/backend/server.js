// imports
require("dotenv").config();
const express = require("express");

// Express app
const app = express();

// Global Middlewares
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Routes
app.get("/", (req, res) => {
	res.json({
		message: "Welcome to the Excercise App!!!",
	});
});

// Listen to server
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";
app.listen(PORT, HOSTNAME, () => {
	console.log(`Listening to server on PORT: ${PORT}`);
});
