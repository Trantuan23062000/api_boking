import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import UserRoute from "./routes/users.js"
import RoomRoute from "./routes/rooms.js"
import HotelRoute from "./routes/hotels.js"
import AuthRoute from "./routes/auth.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()
dotenv.config()


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/users", UserRoute)
app.use("/api/rooms", RoomRoute)
app.use("/api/hotels", HotelRoute)
app.use("/api/auth", AuthRoute)










//connect database
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected database.");
    } catch (error) {
        throw error;
    }
};


mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.listen(8800, () => {
    connect();
    console.log("Connected to sever.");
});