import express from "express"
import dotenv from "dotenv"
import ErrorMiddleware from "./middleware/ErrorMiddleware.js"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config({
    path:"./config/config.env"
})


export const app = express()

// using Middlewares
app.use(express.json())
app.use(express.urlencoded({
    extended:"true"
}))
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"]
}))

// importing and using routes
import user from "./routes/userRoutes.js"
import course from "./routes/courseRoutes.js"
import payment from "./routes/paymentsRoutes.js"
import other from "./routes/otherRoutes.js"
app.use("/api/v1",user)
app.use("/api/v1",course)
app.use("/api/v1",payment)
app.use("/api/v1",other)


// using errrorMiddleware at last 
app.use(ErrorMiddleware)
