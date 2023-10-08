const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timeOfDay: { type: String, required: true },
  date: { type: Date, required: true },
  mealData: { type: Array, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
