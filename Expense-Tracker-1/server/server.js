import { config } from "dotenv";
import express from "express";
import { connectDB } from "./db/connect.js";
import cors from "cors";

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

app.post("/api/transactions", (req, res) => {
	console.log(req.body);
	res.status(200).json({
		msg: "Form Data Recieved...",
	});
});

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
