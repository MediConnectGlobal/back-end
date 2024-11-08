import Joi from "joi";

export const treatmentValidationSchema = Joi.object({
    vitals: Joi.string().required(),
    medicalNote: Joi.string().required(),
    comment: Joi.string().required(),
    nextVisit: Joi.string().required()
});

export const updateTreatmentValidationSchema = Joi.object({
    vitals: Joi.string(),
    medicalNote: Joi.string(),
    comment: Joi.string(),
    nextVisit: Joi.string()
});