const mongoose = require("mongoose");

const connectDb = (url) => {
	mongoose.set("strictQuery", true).connect(url);
};

module.exports = { connectDb };
