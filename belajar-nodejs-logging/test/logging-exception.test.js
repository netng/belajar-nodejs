import winston from "winston";

test('custom transport transport', () => {

    const logger = winston.createLogger({
        level: 'silly',
        transports: [
            new winston.transports.File({
                handleExceptions: true,
                filename: 'exception.log',
            })
        ]
    })

    logger.info('hello custome transport')
  
    hello()
})
