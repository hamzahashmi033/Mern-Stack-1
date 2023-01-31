import ErrorHandler from "../utils/Error.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
    
        if (!token) {
          return res.status(401).json({ success: false, message: "Login First" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = await User.findById(decoded._id);
    
        next();
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    };

  export const authorizedAdmin = (req,res,next)=>{
    if(req.user.role!=="admin"){
      return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`),403)
    }
    next();

  }
  export const authorizedSubscriber = (req,res,next)=>{
    if(req.user.subscription.status !=="Subscribed" && req.user.role!=="admin"){
      return next(new ErrorHandler(`Only Subscribered is allowed to access this resource`),403)
    }
    next();

  }