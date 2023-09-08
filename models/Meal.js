const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
	title: { type: String, required: true },
});
