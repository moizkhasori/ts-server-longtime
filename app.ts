import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorHandler from "./Middlewares/errorHandler.js";
import { connectToMongoDB } from "./config/connectMongoDB.js";
dotenv.config({
    path: "./.env"
});



const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes


// errorMiddleware
app.use(errorHandler)


// dbConnection
connectToMongoDB();

// server
app.listen(process.env.PORT, () => {
    console.log(`Server Started at Port ${process.env.PORT} 👋`);
})
