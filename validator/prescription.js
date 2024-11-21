import Joi from "joi";

export const prescriptionValidationSchema = Joi.object({
    userId: Joi.string().required(),
     medication: Joi.array().items(
        Joi.object({
            drug: Joi.string().required(),
            dose: Joi.string().required(),
            days: Joi.string().required(),
        })
    ).required(),
});

export const updatePrescriptionValidationSchema = Joi.object({
    userId: Joi.string(),
    medication: Joi.array().items(
        Joi.object({
            drug: Joi.string().required(),
            dose: Joi.string().required(),
            days: Joi.string().required(),
        })
    )
});