import winston from "winston"

test('transport level', () => {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.colorize(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console({}),
            new winston.transports.File({
                filename: 'application.log'
            }),
            new winston.transports.File({
                level: 'error',
                filename: 'application-error.log'
            })
        ]
    })

    logger.info('logger info')
    logger.warn('logger warn')
    logger.error('logger error')
})