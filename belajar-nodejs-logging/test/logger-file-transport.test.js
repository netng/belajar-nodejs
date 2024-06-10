import winston from "winston";

test('logger file transport', () => {
    const logger = winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.File({
                filename: 'application.log'
            }),
            new winston.transports.Console({})
        ]
    })

    logger.info('log info')
    logger.warn('log swarning')
})