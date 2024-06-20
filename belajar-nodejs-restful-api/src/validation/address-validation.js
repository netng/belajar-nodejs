import Joi from "joi";

export const createAddressValidation = Joi.object({
    street: Joi.string().max(255).optional(),
    city: Joi.string().max(100).optional(),
    province: Joi.string().max(100),
    country: Joi.string().required().max(100),
    postal_code: Joi.string().required().max(10)
})

export const getAddressValidation = Joi.number().positive().required()

export const updateAddressValidation = createAddressValidation