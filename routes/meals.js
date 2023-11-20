const express = require("express");
const { check, validationResult } = require("express-validator");

const Meal = require("../models/Meal");

const router = express.Router();

const validate = [
  [
    check("title")
      .isLength({ min: 3, max: 50 })
      .withMessage("Title should be between 3 to 50 characters"),
  ],
];

router.post("/", (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const meal = new Meal({
    title: req.body.title,
    timeOfDay: req.body.timeOfDay,
    imageUrl: req.body.imageUrl,
    date: req.body.date,
    mealData: req.body.mealData,
    mealId: req.body.mealId,
  });

  meal
    .save()
    .then((result) => {
      res.send({
        message: "Meal data created successfully",
        data: result,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
  Meal.find()
    .then((meal) => {
      res.send(meal);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
