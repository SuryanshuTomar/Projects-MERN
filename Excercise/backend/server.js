// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require("./routes/workouts.routes");

// Express app
const app = express();

// Global Middlewares
app.use(express.json()); // json parser
app.use(
	cors({
		origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
	})
);

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Routes
app.get("/", (req, res) => {
	res.json({
		message: "Welcome to the Excercise App!!!",
		info: "Workouts api on -> /api/workouts path",
	});
});

// Routes Middlewares
app.use("/api/workouts", workoutRoutes);

// Connect to Mongo DB
mongoose
	.set("strictQuery", true)
	.connect(process.env.MONGO_URI)
	.then(() => {
		// Listen to server only if we are connected to the DB
		const PORT = process.env.PORT || 3000;
		const HOSTNAME = process.env.HOSTNAME || "localhost";
		app.listen(PORT, HOSTNAME, () => {
			console.log(`Listening to server on PORT: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log("Something Went Wrong!!!");
		console.log(error);
	});
