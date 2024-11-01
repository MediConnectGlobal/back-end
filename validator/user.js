import Joi from "joi";

export const registerUserValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    contact: Joi.string().required(),
    password: Joi.string().required(),
    location: Joi.string().required(),
    role: Joi.string().valid('patient', 'staff', 'admin'),
    staffType: Joi.string()
});

export const logInUserValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().required(),
    contact: Joi.string(),
    password: Joi.string().required(),
    location: Joi.string(),
    
});

export const updateUserValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    contact: Joi.string(),
    password: Joi.string(),
    location: Joi.string(),
    avatar: Joi.string()
});