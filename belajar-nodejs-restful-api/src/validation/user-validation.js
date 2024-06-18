import Joi from "joi";

export const userRegistrationValidation = Joi.object({
    username: Joi.string().required().max(100),
    password: Joi.string().required().max(100),
    name: Joi.string().required().max(100)
})

export const userLoginValidation = Joi.object({
    username: Joi.string().required().max(100),
    password: Joi.string().required().max(100)
})