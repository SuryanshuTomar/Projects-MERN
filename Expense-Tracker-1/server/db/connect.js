import mongoose from "mongoose";

function connectDB(url) {
	// mongoose.set().connect() => thenable function
	mongoose.set("strictQuery", true).connect(url);
}

export { connectDB };
