import User from "../models/userModel.js";
import { asyncHandler } from "@robinblomberg/express-async-handler";
import generateToken from "../utils/generateToken.js";

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(name, email, password);                //prints in terminal

  //validation
  if (!name || !password || !email) {
    res.status(400);
    const err = new Error("Please fill all the details");
    return next(err);
  }

  if (password.length < 9) {
    res.status(400);
    const err = new Error("Password must be more than 9 characters");
    return next(err);
  }

  const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    const err = new Error("Please enter a valid email");
    return next(err);
  }

  try {
    //user already existing or not   [method 1]
    // const userExist = await User.findOne({email})
    // if(userExist){
    //     res.status(400)
    //     const err = new Error ("Email is already registered. Enter a different email")
    //     return next(err)
    // }

    //if not user, create a new one
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      }); //prints in postman console
    }
  } catch (error) {
    console.log(error);

    // [method 2]
    if (error.code === 11000) {
      res.status(400);
      const err = new Error(
        "Email is already registered. Enter a different email"
      );
      return next(err);
    }

    res.status(500).json({ error: error.message } || "Internal Server Error");
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //email check
  const user = await User.findOne({ email });

  if (user && (await user.checkPassword(password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid mail and password credential");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwtToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out.." });
});

const getProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res
      .status(200)
      .json({ _id: req.user._id, name: req.user.name, email: req.user.email });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export { createUser, loginUser, logoutUser, getProfile, updateProfile };
