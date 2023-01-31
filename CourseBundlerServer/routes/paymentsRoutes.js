// const express = require("express")
// const {processPayment,sendStripeApiKey} = require("../controllers/paymetController.cjs")
// const {isAuthenticated} = require("../middleware/auth.js")
import express from "express"
import { cancelSubscription, processPayment, refundPayment, sendStripeApiKey } from "../controllers/paymetController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/payment/process").post(isAuthenticated,processPayment)
router.route("/payment/cancel").get(isAuthenticated,cancelSubscription)
router.route("/stripeapikey").get(sendStripeApiKey)
router.route("/payment/refund").post(isAuthenticated,refundPayment)

export default router;