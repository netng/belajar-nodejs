import winston from "winston";

test('logger with format', () => {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.printf((log) => {
            return `${new Date()} : ${log.level.toUpperCase()} : ${log.message}`
        }),
        transports: [
            new winston.transports.Console({})
        ]
    })

    logger.warn('hello format')
    logger.error('hello format')
    logger.info('hello format')
})

test('logger with format', () => {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.simple(),
        transports: [
            new winston.transports.Console({})
        ]
    })

    logger.warn('hello format')
})