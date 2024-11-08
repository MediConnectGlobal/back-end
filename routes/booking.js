import { Router } from "express";
import { addBooking, deleteBooking, getAllBookings, getOneBooking, updateBooking } from "../controller/booking";

const bookingRouter = Router();

bookingRouter.post('/bookings', addBooking);

bookingRouter.get('/bookings', isAuthenticated, hasPermission('get_booking'), getOneBooking);

bookingRouter.get('/bookings', isAuthenticated, hasPermission('get_all_booking'), getAllBookings);

bookingRouter.patch('/bookings', updateBooking);

bookingRouter.delete('/bookings', deleteBooking);

export default bookingRouter;
