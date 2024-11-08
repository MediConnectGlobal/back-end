import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import staffRouter from "./routes/staff.js";
import reviewRouter from "./routes/review.js";
import bookingRouter from "./routes/booking.js";
import testRouter from "./routes/test.js";
import prescriptionRouter from "./routes/prescription.js";
import treatmentRouter from "./routes/treatment.js";

// Connect to database
await mongoose.connect(process.env.MONGO_URI);

// Create an express app
const app = express();

// Use middlewares
app.use(cors())
app.use(express.json());

// Use Routes
app.use(userRouter)
app.use(staffRouter)
app.use(reviewRouter)
app.use(bookingRouter)
app.use(testRouter)
app.use(prescriptionRouter)
app.use(treatmentRouter)


// Listen for incoming reqeusts
app.listen(process.env.PORT, () => {
    console. log(`App is listening on port ${process.env.PORT}`);

});