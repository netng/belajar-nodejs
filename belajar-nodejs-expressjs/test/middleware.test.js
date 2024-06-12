import express from 'express'
import request from 'supertest'

// Middleware
const logger = (req, res, next) => {
    console.info(`Received request: ${req.method} : ${req.originalUrl}`)
    next()
}

const addPoweredHeader = (req, res, next) => {
    res.set('X-Powered-By', 'Nandang Super')
    next()
}

const apiKeyMiddleware = (req, res, next) => {
    if (req.query.apiKey) {
        next()
    } else {
        res.status(401).end()
    }
}

const requestTimeMiddleware = (req, res, next) => {
    req.requestTime = new Date()
    next()
}

const app = express()

app.use(logger)
app.use(apiKeyMiddleware)
app.use(addPoweredHeader)
app.use(requestTimeMiddleware)

app.get('/', (req, res) => {
    res.send('Hello response')
})

app.get('/time', (req, res) => {
    res.send(`Hello, today is ${req.requestTime}`)
})

test('middleware', async () => {
    const response = await request(app).get('/').query({ apiKey: '123' })

    expect(response.text).toBe('Hello response')
    expect(response.get('X-Powered-By')).toBe('Nandang Super')
})

test('middleware unauthorized', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(401)
})


test('middleware unauthorized', async () => {
    const response = await request(app).get('/time').query({ apiKey: '123' })

    expect(response.text).toContain('Hello, today is')
})