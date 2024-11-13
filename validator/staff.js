import Joi from "joi";

export const registerStaffValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    contact: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string(),
    specialty: Joi.string().valid('Doctor', 'Nurse', 'Dentist', 'Specialist', 'Pharmacist'),
    lincenceNumber: Joi.string().required(),
    facility: Joi.string().required(),
    department: Joi.string().required()
});

export const logInStaffValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    contact: Joi.string(),
    password: Joi.string().required(),
    specialty: Joi.string(),
    lincenceNumber: Joi.string(),
    facility: Joi.string(),
    department: Joi.string()
    
});

export const updateStaffValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    contact: Joi.string(),
    password: Joi.string(),
    avatar: Joi.string(),
    specialty: Joi.string(),
    lincenceNumber: Joi.string(),
    facility: Joi.string(),
    department: Joi.string()
});
        
        

