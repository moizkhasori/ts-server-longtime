import express from "express";
import { handleSignupUser, handleTest } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup",handleSignupUser)
router.post("/test", handleTest)

export {router as userRouter};