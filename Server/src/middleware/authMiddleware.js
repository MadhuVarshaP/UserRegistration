import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { asyncHandler } from "@robinblomberg/express-async-handler";

const checkToken = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decodedToken.userId);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid Token!");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized!");
  }
});

export { checkToken };
