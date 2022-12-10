require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnect = require("./dbConnect");

dbConnect();

app.use(express.json());
app.use(cors);

const port = process.env.PORT || 8080;

app.listen(port, "localhost", () =>
	console.log("Listening on port ", port, "...")
);
