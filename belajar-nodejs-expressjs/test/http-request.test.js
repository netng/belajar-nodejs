import express from 'express'
import request from 'supertest'

const app = express()

test('http request test query param', async () => {
    app.get('/', (req, res) => {
        res.send(`Hello ${req.query.name}`)
    })

    const response = await request(app).get('/').query({name: 'world'})

    expect(response.text).toBe('Hello world')
})