import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectDB } from "./db/connect.js";
import TransactionRouter from "./routes/transaction.routes.js";

// configs
const app = express();
config(); // loading the .env file variables in the process.env

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
	res.status(200).json({
		msg: "Welcome to Expense Tracker API !",
	});
});

// api router middlewares
app.use("/api/v1", TransactionRouter);

// start
async function startServer() {
	try {
		await connectDB(process.env.MONGO_URI);
		const PORT = process.env.PORT || 4000;
		const HOST = process.env.HOST || "localhost";
		app.listen(PORT, HOST, () => {
			console.log(`Server listening on PORT: ${PORT}...`);
		});
	} catch (error) {
		console.log("Something Went Wrong!!!");
		console.log(error);
	}
}

startServer();
