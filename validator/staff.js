import Joi from "joi";

    export const staffValidationSchema = Joi.object({
        position: Joi.string().required(),
        lincenceNumber: Joi.string().required(),
        facility: Joi.string().required(),
        department: Joi.string().required(),
    });

    export const updateStaffValidationSchema = Joi.object({
        position: Joi.string(),
        lincenceNumber: Joi.string().required(),
        facility: Joi.string(),
        department: Joi.string()

    });