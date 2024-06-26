import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file"

test('logger console transport', () => {
    const logger = winston.createLogger({
        level: 'silly',
        transports: [
            new winston.transports.Console({}),
            new DailyRotateFile({
                filename: 'app-%DATE%.log',
                zippedArchive: true,
                maxSize: '100m',
                maxFiles: '14d'
            })
        ]
    })

    for (let i = 0; i < 100; i++) {
        logger.info(`hello log ${i}`)
    }
  
})