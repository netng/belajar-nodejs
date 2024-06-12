import express from 'express'
import request from 'supertest'


const app = express()

app.get('/', (req, res) => {
    if (req.query.name) {
        res.status(200)
        res.send(`Hello ${req.query.name}`)
    } else {
        res.status(200).end
    }
})

test('http response status', async () => {
    const response = await request(app).get('/')
        .query({ name: 'Nandang' })
    
    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello Nandang')
})