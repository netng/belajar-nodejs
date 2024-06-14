import Joi from "joi";

describe('Joi', () => {
    it('should can validate array', () => {
        const hobbiesSchema = Joi.array().items(
            Joi.string().min(5).max(100).required()
        ).min(1).unique()

        const hobbies = ['coding', 'coding', 'A', 200]

        const result = hobbiesSchema.validate(hobbies, {
            abortEarly: false
        })

        console.info(result)
    });


    it('should can validate array of object', () => {
        const addressesSchema = Joi.array().items(
            Joi.object({
                street: Joi.string().required().max(200),
                city: Joi.string().required().max(100),
                country: Joi.string().required().max(100),
                zipCode: Joi.string().required().max(10)
            })
        ).min(1)

        const addresses = [
            {
                street: 'jalan selalu ada'
            }
        ]

        const result = addressesSchema.validate(addresses, {
            abortEarly: false
        })

        console.info(result)
    });
});