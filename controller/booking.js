import { BookingModel } from "../model/booking.js";
import { bookingValidationSchema, updateBookingValidationSchema } from "../validator/booking.js";
import { createEvent } from 'ics';
import { format, parseISO, addHours } from 'date-fns';  // Import date-fns
import { google } from "googleapis";
// Google APIs for potential Gemini integration


const auth = new google.auth.GoogleAuth({
    keyFile: 'path/to/your-service-account.json',  // Replace with the path to your service account file
    scopes: ['https://www.googleapis.com/auth/calendar'],  // Define the necessary scopes
  });
  
  const calendar = google.calendar({ version: 'v3', auth });


const getAiBookingSuggestions = async (userId) => {
    // This function would interact with Google Gemini or a similar AI API
    // Simulate a response that could suggest times based on past data
    const aiSuggestions = [
      '2024-11-15T14:30:00', // Suggested based on past bookings
      '2024-11-15T16:00:00'
    ];
    return aiSuggestions; // Return suggested times
  };
  
  export const addBooking = async (req, res, next) => {
      try {
          // Validate request body
          const { error, value } = bookingValidationSchema.validate(req.body);
          if (error) {
              return res.status(422).json(error);
          }
  
          // Simulate AI suggestion from Google Gemini (or similar)
          const userId = req.body.userId;  // Assume userId is passed in the request
          const aiSuggestedTimes = await getAiBookingSuggestions(userId);
  
          // If the suggested times are available, you could offer them to the user
          // (For simplicity, just logging the suggestions here)
          console.log('AI Suggested Times:', aiSuggestedTimes);
  
          // Save booking in the database
          const booking = await BookingModel.create(value);
  
          // Use Date-fns to handle time formatting and ensure correct date types
          const startDateTime = parseISO(req.body.startDateTime);  // Ensure it's a valid Date object
          const endDateTime = addHours(startDateTime, 1);  // Example: Add 1 hour for appointment duration
  
          // Format the start and end time using date-fns
          const formattedStart = format(startDateTime, 'yyyyMMdd\'T\'HHmmss');
          const formattedEnd = format(endDateTime, 'yyyyMMdd\'T\'HHmmss');
  
          // Generate iCalendar file (ICS) for the booking
          const event = {
              start: [
                  startDateTime.getFullYear(),
                  startDateTime.getMonth() + 1, // Months are 0-based
                  startDateTime.getDate(),
                  startDateTime.getHours(),
                  startDateTime.getMinutes(),
              ],
              end: [
                  endDateTime.getFullYear(),
                  endDateTime.getMonth() + 1,
                  endDateTime.getDate(),
                  endDateTime.getHours(),
                  endDateTime.getMinutes(),
              ],
              title: req.body.title,
              description: req.body.description,
              location: req.body.location,
              contactMode: req.body.contactMode,
              status: 'CONFIRMED',
          };
  
          // Create the .ics file
          createEvent(event, (error, value) => {
              if (error) {
                  console.error(error);
                  return res.status(500).json({ message: 'Error generating calendar event' });
              }
  
              // Respond with ICS file as a downloadable attachment
              res.setHeader('Content-Type', 'text/calendar');
              res.setHeader('Content-Disposition', `attachment; filename="booking.ics"`);
              res.status(201).send(value); // Send .ics file content
          });
  
          res.status(201).json('Booking added successfully, and ICS file generated!');
      } catch (error) {
          next(error);
      }
  };



export const getAllBookings = async(req, res, next) => {
       try {

       const bookings = await BookingModel.find(req.body);
         res.json ({
            message: "All bookings",schedules: bookings});
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
