import express from 'express'
import request from 'supertest'


const app = express()

const errrorMiddleware = (err, req, res, next) => {
    res.status(500).send(`Terjadi error: ${err.message}`)
}

app.get('/', (req, res) => {
    throw new Error('Ups')
})

app.use(errrorMiddleware)

test('error handling', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(500)
    expect(response.text).toBe('Terjadi error: Ups')
})