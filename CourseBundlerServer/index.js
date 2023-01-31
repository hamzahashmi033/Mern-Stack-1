import { app } from "./app.js"
import { connectDB } from "./config/database.js"
import cloudinary from "cloudinary"
import nodeCron from "node-cron"
import { Stats } from "./models/Stats.js"


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_KEY,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET
})
connectDB()
nodeCron.schedule("0 0 0 5 * *", async () => {
    try {
      await Stats.create({});
    } catch (error) {
      console.log(error);
    }
  });
app.get("/",(req,res)=>{
  res.send("server is running perfectly")
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT} `)
})