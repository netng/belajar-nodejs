import winston from "winston";
import TransportStream from 'winston-transport'

test('custom transport transport', () => {

    class MyTransport extends TransportStream {
        constructor(option) {
            super(option)
        }

        log(info, next) {
            console.log(`${new Date()} : ${info.level.toUpperCase()} : ${info.message}`)
            next()
        }
    }


    const logger = winston.createLogger({
        level: 'silly',
        transports: [
            new MyTransport({})
        ]
    })

    logger.info('hello custome transport')
  
})