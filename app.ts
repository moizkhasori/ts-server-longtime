import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import { connectToMongoDB } from "./config/connectMongoDB.js";
import { TryCatch } from "./utils/trycatch.js";
import { userRouter } from "./routes/userRoutes.js";


dotenv.config({
    path: "./.env"
});



const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRouter)

// errorMiddleware
app.use(errorHandler)


// dbConnection
connectToMongoDB();

// server
app.listen(process.env.PORT, () => {
    console.log(`Server Started at Port ${process.env.PORT} 👋`);
})
