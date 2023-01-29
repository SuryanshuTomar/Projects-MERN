// imports
require("dotenv").config(); // load all the .env file variables to the process.env
// require("./db/connect"); // it will execute the mongoose.connect() method automaically
const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");

const workoutRoutes = require("./routes/workouts.routes");
const userRoutes = require("./routes/user.routes");
const notFound = require("./middleware/not-found");
const errorHandlerMiddlerware = require("./middleware/error-handler");

// Express app
const app = express();

// Global Middlewares
app.use(express.json()); // json parser
app.use(
	cors({
		origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
	})
); // add orgin for cors

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
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandlerMiddlerware);

// Connect to Mongo DB
// async because connectDB returns a thenable function
// note: mongoose.methods() are thenable function
const startServer = async () => {
	try {
		// connect
		await connectDB(process.env.MONGO_URI);

		// Listen to server only if we are connected to the DB
		const PORT = process.env.PORT || 3000;
		const HOSTNAME = process.env.HOSTNAME || "localhost";
		app.listen(PORT, HOSTNAME, () => {
			console.log(`Listening to server on PORT: ${PORT}`);
		});
	} catch (error) {
		console.log("Something Went Wrong!!!");
		console.log(error);
	}
};

startServer();
