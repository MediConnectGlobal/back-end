import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";

// Connect to database
await mongoose.connect(process.env.MONGO_URI);

// Create an express app
const app = express();

// Use middlewares
app.use(cors())
app.use(express.json());

// Use Routes
app.use(userRouter)

// Listen for incoming reqeusts
app.listen(4000, () => {
    console. log('App is listening on port 4000');

});