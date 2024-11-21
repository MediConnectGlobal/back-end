import Joi from "joi";

export const testValidationSchema = Joi.object({
    userId: Joi.string().required(),
   test: Joi.array().items(
       Joi.object({
           testType: Joi.string().required(),
           issued: Joi.string().required(),
           comment: Joi.string(), 
       }) 
   )   
}).required()

export const updateTestValidationSchema = Joi.object({
    userId: Joi.string(),
    test: Joi.array().items(
        Joi.object({
testType: Joi.string(),
issued: Joi.string(),
comment: Joi.string(),
file: Joi.string().required(),
image: Joi.string()
    })
)
 })