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
import adminRouter from "./routes/admin.js";
import passport from "passport";
import session from "express-session";
// Connect to database
await mongoose.connect(process.env.MONGO_URI);

// Create an express app
const app = express();

// Use middlewares
app.use(cors())
app.use(express.json());
// require('./auth')

// Use Routes
app.use(userRouter)
app.use(staffRouter)
app.use(reviewRouter)
app.use(bookingRouter)
app.use(testRouter)
app.use(prescriptionRouter)
app.use(treatmentRouter)
app.use(adminRouter)

// google seession
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// function to set login
const isloggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
// use routes to get google accounts
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Sign in with Google</a>');
});
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/google/callback', passport.authenticate('google', { 
    successRedirect: '/protected',
    failureRedirect: '/' 
})
);
app.get('/protected', isloggedIn, (req, res) => {
    res.send(`Welcome, you are logged in! ${req.user.displayName}`);
})

app.get ('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('/Goodbye!');
});

// Listen for incoming reqeusts
app.listen(process.env.PORT, () => {
    console. log(`App is listening on port ${process.env.PORT}`);

});