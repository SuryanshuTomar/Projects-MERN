// imports
const express = require("express");

// Express app
const app = express();

// Listen to server
const PORT = 3500;
const HOST = "localhost";
app.listen(PORT, HOST, () => {
	console.log(`Listening to server on PORT: ${PORT}`);
});
