require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const movieRoutes = require("./routes/Movie");
const cors = require("cors");
const app = express();

dbConnect();

app.use(express.json());
app.use(cors);

app.use("/api", movieRoutes);

const port = process.env.PORT || 8080;

app.listen(port, "localhost", () =>
	console.log("Listening on port ", port, "...")
);
