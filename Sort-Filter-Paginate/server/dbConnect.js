const mongoose = require("mongoose");

const dbConnect = () => {
	mongoose.connect(process.env.DB);

	mongoose.connection.on("connected", () => {
		console.log("Connected to the database Successfully....");
	});

	mongoose.connection.on("error", (err) => {
		console.log("Error while connecting to the Database...." + err);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Mongo DB connection disconnected....");
	});
};

module.exports = dbConnect;
