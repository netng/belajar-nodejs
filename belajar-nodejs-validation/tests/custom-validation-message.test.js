import Joi from "joi";

describe('Joi', () => {
    it('should can validate with custom messages', () => {
        const schema = Joi
            .string()
            .min(5)
            .max(10)
            .required()
            .messages({
                'string.min': '{{#label}} minimal panjang {{#limit}} karakter',
                'string.max': '{{#label}} maksimal panjang {{#limit}} karakter',
                'string.required': '{{#label}} wajib diisi',
                'string.empty': '{{#label}} tidak boleh kosong'
            })

        const request = ''

        const result = schema.validate(request)

        console.info(result)

    });
});