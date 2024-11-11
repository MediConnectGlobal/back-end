import Joi from "joi";

export const treatmentValidationSchema = Joi.object({
   vitals: Joi.array().items(
        Joi.object({
            temperature: Joi.string(),
            pulse: Joi.string(),
            BP: Joi.string()
        })
    ).required(),

    medicalNote: Joi.array().items(
        Joi.object({
            PC: Joi.string().required(),
            PMH: Joi.string().required(),
            ODG: Joi.string().required(),
            IMP: Joi.string().required(),
            Plan: Joi.string().required()
        })
    ).required(),

    comment: Joi.string().required(),
    nextVisit: Joi.string()  // Assuming nextVisit is a date, use Joi.date().iso()
});

export const updateTreatmentValidationSchema = Joi.object({
    vitals: Joi.array().items(
        Joi.object({
            temperature: Joi.string(),
            pulse: Joi.string(),
            BP: Joi.string()
        })
    ),

    medicalNote: Joi.array().items(
        Joi.object({
            PC: Joi.string(),
            PMH: Joi.string(),
            ODG: Joi.string(),
            IMP: Joi.string(),
            Plan: Joi.string()
        })
    ),

    comment: Joi.string(),
    nextVisit: Joi.date().iso()  // Assuming nextVisit is a date, use Joi.date().iso()
});