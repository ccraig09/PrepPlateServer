const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const meals = require("./routes/meals");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to the Dinners Ready App");
});

app.use("/api/meals", meals);

require("dotenv").config();

const PORT = process.env.PORT || 5000;

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ccluster0.yws2enj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
	)
	.then((result) => {
		app.listen(PORT, () =>
			console.log(`Server is running on port ${PORT}`)
		);
	})
	.catch((err) => console.log(err));
