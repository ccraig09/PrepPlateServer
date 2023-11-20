const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timeOfDay: { type: String, required: true },
  imageUrl: { type: String, required: true },
  date: { type: Date, required: true },
  mealData: { type: Array, required: true },
  mealId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Meal", MealSchema);
