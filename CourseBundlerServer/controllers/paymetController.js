
import { User } from "../models/User.js";
import ErrorHandler from "../utils/Error.js";

import { catchAsyncError } from "../middleware/catchAsyncError.js";

import Stripe from "stripe";
const secret = process.env.STRIPE_SECRET_KEY;
export const stripe = new Stripe(
  "sk_test_51LyEYJGTxrUiQJceOiV4aAaXoxh0m26x7gCecJg6cZDBzSIGBVD7xHNWHNRLXCt43ZZhl1Q2NmVTLGcZOr5cq8ut002mrWBvM4"
);

export const processPayment = catchAsyncError(async (req, res, next) => {
  try {

    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "Course Bundler",
      },
    });
    const user = await User.findById(req.user._id)
    if(!user){
        return next(new ErrorHandler("User not found"),404)
    }

      user.subscription.status = "Subscribed"
      user.subscription.id = myPayment.id
      await user.save()
   
    
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret , id:myPayment.id});
          
  } catch (error) {
   console.log(error) 
  }
  });
  export const cancelSubscription = catchAsyncError(async (req, res, next) => {
    try {

      const user = await User.findById(req.user._id)
      if(!user){
          return next(new ErrorHandler("User not found"),404)
      }
  
        user.subscription = undefined
        await user.save()
     
      
      res
        .status(200)
        .json({ success: true,message:"Subscription Cancelled"});
            
    } catch (error) {
     console.log(error) 
    }
    });
  export const refundPayment = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id)
    if(!user){
      return next(new ErrorHandler("User not found"),404)
    }
    const myPayment = await stripe.refunds.create({

    charge:user.subscription.id,  
    amount:7000,
    currency:"usd"
    });
    
    user.subscription.status = "Not Subscribed"
    await user.save()
    res
      .status(200)
      .json({ success: true, message:"Paymment have been refund"});
  });
  export const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  });