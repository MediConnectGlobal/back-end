import Joi from "joi";

export const prescriptionValidationSchema = Joi.object({
    medication: Joi.string().required(),
    dose: Joi.string().required(),
    days: Joi.string().required()
});

export const updatePrescriptionValidationSchema = Joi.object({
    medication: Joi.string().required(),
    dose: Joi.string(),
    days: Joi.string()
});