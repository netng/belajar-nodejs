import winston from "winston";

test('logger console transport', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({})
        ]
    })

    logger.log({
        level: 'info',
        message: 'hello logging tranport'
    })
})