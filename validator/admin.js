import Joi from "joi";

export const registerAdminValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    contact: Joi.string().required(),
    password: Joi.string().required(),
    facility: Joi.string().required(),
    role: Joi.string().valid('Admin', 'Super Admin'),
});

export const logInAdminValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().required(),
    contact: Joi.string(),
    password: Joi.string().required(),
    facility: Joi.string(),
    
});

export const updateAdminValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    contact: Joi.string(),
    password: Joi.string(),
    facility: Joi.string(),
    avatar: Joi.string()
});