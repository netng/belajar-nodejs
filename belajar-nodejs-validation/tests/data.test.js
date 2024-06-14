import Joi from "joi";

describe('Joi', () => {
    it('should can validate date', () => {
        const birtDateSchema = Joi.date().max('now').min('1-1-1998').required()

        const result = birtDateSchema.validate('1-1-1997')
        console.info(result)
        console.info(result.value)
        console.info(result.error)
        console.info(typeof result.value)
        console.info(typeof result.error)

        const result2 = birtDateSchema.validate('1-24-2024')
        console.info(result2)

        const result3 = birtDateSchema.validate('1-1-2030')
        console.info(result3)

    });
    
});