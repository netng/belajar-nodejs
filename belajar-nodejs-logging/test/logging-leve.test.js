import winston from "winston";

test('logger console transport', () => {
    const logger = winston.createLogger({
        level: 'silly',
        transports: [
            new winston.transports.Console({})
        ]
    })

    logger.log({level: 'error', message: 'hello error'})
    logger.log({level: 'warn', message: 'hello warn'})
    logger.log({level: 'info', message: 'hello info'})
    logger.log({level: 'http', message: 'hello http'})
    logger.log({level: 'verbose', message: 'hello verbose'})
    logger.log({level: 'debug', message: 'hello debug'})
    logger.log({level: 'silly', message: 'hello silly'})
})

test('logging with shortcut function', () => {
    const logger = winston.createLogger({
        level: 'silly',
        transports: [
            new winston.transports.Console({})
        ]
    })

    logger.error('hello error')
    logger.warn('hello warn')
    logger.info('hello info')
    logger.http('hello http')
    logger.verbose('hello verbose')
    logger.debug('hello debug')
    logger.silly('hello silly')
})