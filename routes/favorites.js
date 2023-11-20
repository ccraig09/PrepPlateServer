const express = require("express");
const { check, validationResult } = require("express-validator");

const Favorite = require("../models/Favorite");

const router = express.Router();

// const validate = [
//   [
//     check("title")
//       .isLength({ min: 3, max: 50 })
//       .withMessage("Title should be between 3 to 50 characters"),
//   ],
// ];

router.post("/", (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const favoriteMeal = new Favorite({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    mealData: req.body.mealData,
    mealId: req.body.mealId,
  });

  favoriteMeal
    .save()
    .then((result) => {
      res.send({
        message: "Favorite meal data created successfully",
        data: result,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
  Favorite.find()
    .then((meal) => {
      res.send(meal);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
