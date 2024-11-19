import { Router } from "express";
import { addBooking, deleteBooking, getAllBookings, getOneBooking, updateBooking } from "../controller/booking.js";
import { isAuthenticated, hasPermission } from "../middleware/authenticator.js";

const bookingRouter = Router();

bookingRouter.post('/bookings', isAuthenticated, addBooking);

bookingRouter.get('/bookings/:id', isAuthenticated, getOneBooking);

bookingRouter.get('/bookings', getAllBookings);

bookingRouter.patch('/bookings/:id',isAuthenticated, updateBooking);

bookingRouter.delete('/bookings/:id',isAuthenticated, deleteBooking);

export default bookingRouter;
