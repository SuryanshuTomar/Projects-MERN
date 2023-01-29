// imports
const mongoose = require("mongoose");

// Connect to Mongo DB Logic
const connectDB = (url) => {
   // mongoose.set().connect() => thenable function
	mongoose.set("strictQuery", true).connect(url);
};

module.exports = connectDB;
