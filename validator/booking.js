import Joi from "joi";

export const bookingValidationSchema = Joi.object ({
    title: Joi.string().required(),
    personalDetails: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required()
})


export const updateBookingValidationSchema = Joi.object ({
    title: Joi.string().required(),
    personalDetails: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
    approval: Joi.boolean(),

});