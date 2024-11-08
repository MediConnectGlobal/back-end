import Joi from "joi";

export const testValidationSchema = Joi.object({
    testType: Joi.string().required(),
    issued: Joi.string().required(),
    comment: Joi.string(),
    file: Joi.string(),
    image: Joi.string()
})
export const updateTestValidationSchema = Joi.object({
testType: Joi.string(),
issued: Joi.string(),
comment: Joi.string(),
file: Joi.string().required(),
image: Joi.string()
})