import Joi from "joi";

const createContactValidation = Joi.object({
    first_name: Joi.string().required().max(100),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().email().max(200).optional(),
    phone: Joi.string().max(20).optional(),
    username: Joi.string().required().max(100)
})

const getContactValidation = Joi.number().positive().required()

const updateContactValidation = Joi.object({
    id: Joi.number().positive().required(),
    first_name: Joi.string().required().max(100),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().email().max(200).optional(),
    phone: Joi.string().max(20).optional(),
    username: Joi.string().required().max(100)
})

const searchContactValidation = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).max(100).positive().default(10),
})

export {
    createContactValidation,
    getContactValidation,
    updateContactValidation,
    searchContactValidation
}