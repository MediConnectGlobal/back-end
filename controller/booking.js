import { BookingModel } from "../model/review.js";
import { bookingValidationSchema, updateBookingValidationSchema } from "../validator/review.js";

export const addBooking = async (req, res, next) => {
       try {
         // validator
         const {error, value} = bookingValidationSchema.validate(req.body);
         if (error) {
             return res.status(422).json(error);
         }

        await BookingModel.create(req.body);
         res.status(201).json ('Booking added Successfully!');
       } catch (error) {
        next(error); 
       }
}

export const getAllBookings = async(req, res, next) => {
       try {

       const bookings = await BookingModel.find(req.body);
         res.json (bookings);
       } catch (error) {
        next (error);
        
       }
}

export const getOneBooking = async(req, res, next) => {
    try {
        const bookings = await BookingModel.findById(req.params.id);
        res.status(200).json (bookings);
    } catch (error) {
        next(error)
    }
}


export const updateBooking = async (req, res, next) => {
    try {

         // validator
         const {error, value} = updateBookingValidationSchema.validate(req.body);
         if (error) {
             return res.status(422).json(error);
         }
        await BookingModel.findByIdAndUpdate(req.params.id)
        res.status(200).json('Booking updated Successfully!');
    } catch (error) {
        next(error);

    }
}

export const deleteBooking = async (req, res, next) => {

    try {
        await BookingModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Booking deleted Successfully!');

    } catch (error) {
        next(error)

    }

}
