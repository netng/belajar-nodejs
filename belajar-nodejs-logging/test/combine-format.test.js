import winston from "winston"

test('combine format', () => {
    const logger = winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console({})
        ]
    })

    logger.error('error logger')
    logger.warn('warn logger')
    logger.info('info logger')
    logger.debug('debug logger')
})