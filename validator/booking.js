import Joi from "joi";

export const bookingValidationSchema = Joi.object ({
    title: Joi.string().required(),
    // userId: Joi.string().required(),
    staffId: Joi.string().required(),
    facility: Joi.string().required(),
    location: Joi.string().valid('Inperson', 'Online'),
    startDateTime: Joi.string().required(),
    endDateTime: Joi.string().required()
});


export const updateBookingValidationSchema = Joi.object ({
    title: Joi.string(),
    userId: Joi.string(),
    staffId: Joi.string(),
    location: Joi.string(),
    facility: Joi.string(),
    startDateTime: Joi.string(),
    endDateTime: Joi.string()

});