import Joi from "joi";

export const registerUserValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('patient', 'staff', 'admin')
});

export const logInUserValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const updateUserValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    avatar: Joi.string()
});