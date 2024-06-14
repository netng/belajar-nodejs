import Joi from "joi";

describe('Joi', () => {
    it('should can validate', () => {
        const usernameSchema = Joi.string().min(5).email().required()

        const result = usernameSchema.validate('nan')

        
        if (result.error) {
            result.error.details.forEach(detail => {
                console.info(`${detail.path} : ${detail.message}`)
            })
        }
    });

    it('should can validate and collect all errors', () => {
        const usernameSchema = Joi.string().min(5).email().required()

        const result = usernameSchema.validate('nan', {
            abortEarly: false
        })

        
        if (result.error) {
            console.info(result.error)
            result.error.details.forEach(detail => {
                console.info(`${detail.path} : ${detail.message}`)
            })
        }
    });
});