const express = require("express");
const { check, validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "SUPERSECRET123";

const router = express.Router();

const User = require("../models/User");

const validate = [
  check("lastName")
    .isLength({ min: 2 })
    .withMessage("Your full name is required"),
  check("lastName")
    .isLength({ min: 2 })
    .withMessage("Your full name is required"),
  check("email").isEmail().withMessage("Please provide a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Your password must be at least 6 characters long"),
];

// STORE SECRET KEY IN A VARIABLE
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    secretKey,
    { expiresIn: "5m" }
  );
};

const loginValidation = [
  check("email").isEmail().withMessage("Please provide a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Your password must be at least 6 characters long"),
];

router.post("/register", validate, async (req, res) => {
  const errors = validationResult(req);
  console.log(">>>req", req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const userExist = await User.findOne({ email: req.body.email });
  if (userExist)
    return res
      .status(400)
      .send({ success: false, message: "Email already exists" });

  const salt = await bycrypt.genSalt();
  const hashedPassword = await bycrypt.hash(req.body.password, salt);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    // create and assign a token
    const token = generateToken(user);
    console.log(">>>>BE token", token);
    res.send({
      success: true,
      data: {
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
});

router.post("/login", loginValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // check if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(404)
      .send({ success: false, message: "User is not registered" });

  // check if password is correct
  const validPassword = await bycrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(404)
      .send({ success: false, message: "Invalid Email or Password" });

  // create and assign a token
  const token = generateToken(user);

  res.header("auth-token", token).send({
    success: true,
    message: "Logged in successfully",
    token,
  });
});

module.exports = router;
