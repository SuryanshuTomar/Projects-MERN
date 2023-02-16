// imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDb } = require("./DB/mongodb");

// file imports
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/users.route");
const productRouter = require("./routes/product.route");

// get instances
const app = express();

// third party middlewares
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
	res.status(200).json({
		status: "Success",
		message: "Welcome to the Ecommerce API",
	});
});

// app middlewares
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// not found
app.get("*", (req, res) => {
	res.status(404).json({
		status: "Failed",
		message: "Route does not exist!",
	});
});

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
