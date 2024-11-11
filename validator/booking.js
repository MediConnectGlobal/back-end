import Joi from "joi";

export const bookingValidationSchema = Joi.object ({
    title: Joi.string().required(),
    userId: Joi.string().required(),
    location: Joi.string().required(),
    contactMode: Joi.string().required(),
    startDateTime: Joi.string().required(),
    endDateTime: Joi.string().required()
})


export const updateBookingValidationSchema = Joi.object ({
    title: Joi.string(),
    userId: Joi.string(),
    location: Joi.string(),
    contactMode: Joi.string(),
    startDateTime: Joi.string(),
    endDateTime: Joi.string()

});