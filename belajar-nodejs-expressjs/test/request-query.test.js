import express from 'express'
import request from 'supertest'

const app = express()

app.get('/', (req, res) => {
    res.send(`hello ${req.query.firstName} ${req.query.lastName}`)
})

test('Test ExpressJS query param', async () => {
    const response = await request(app)
        .get('/')
        .query({ firstName: 'Nandang', lastName: 'Sopyan' })

    expect(response.text).toBe('hello Nandang Sopyan')
})