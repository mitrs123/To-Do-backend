import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";

export const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) return next(new AppError("unauthorised", 401));
    const token = authHeader.replace(/^Bearer\s/, "");
    const decodetoken = jwt.verify(token,"mitXsecret")
    const currentTimeInSeconds = Math.floor(Date.now()/1000);
    const userId = decodetoken.id;
    const expiry = decodetoken.exp;
    if (expiry && expiry < currentTimeInSeconds) return next(new AppError("unauthorised user", 401));;
    const user = User.findById(userId)
    if(!user) return next(new AppError("user not found", 400));
    req.body.user = user
    next()
}
