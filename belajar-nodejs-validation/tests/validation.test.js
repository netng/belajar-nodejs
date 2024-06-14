import Joi from 'joi'

describe('Joi', () => {
    it('should can create schema', () => {
        const schema = Joi.string().min(3).max(100).required()

        const result = schema.validate('na')

        if (result.error) {
            console.error(result.error)
        }
    });

    it('should can validate basic data type', () => {
        const usernameSchema = Joi.string().email().required()
        const isAdminSchema = Joi.boolean().required()
        const priceSchema = Joi.number().min(10_000).max(10_000_000).required()

        const resultUsername = usernameSchema.validate('nandang@gmail.com')
        console.log(resultUsername)

        const resultIsAdmin = isAdminSchema.validate(true)
        console.log(resultIsAdmin)

        const resultPrice = priceSchema.validate(10000)
        console.log(resultPrice)
        
    });
});