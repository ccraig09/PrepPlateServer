const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const meals = require("./routes/meals");

const favoriteMeals = require("./routes/favorites");

app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/auth");

//middleware
const verifyToken = require("./routes/verifyToken");

app.get("/", (req, res) => {
  res.send("Welcome to the Prep and Plate App");
});

app.get("/api/user/profile", verifyToken, (req, res) => {
  res.send({ success: true, data: req.user });
});

app.use("/api/meals", meals);
app.use("/api/users", authRoutes);
app.use("/api/favorites", favoriteMeals);

require("dotenv").config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8ny7oth.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
