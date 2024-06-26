import express from 'express'
import request from 'supertest'

const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sample.txt')
})

test('sendFile response', async () => {
    const response = await request(app).get('/')

    expect(response.text).toBe('This is sample text')
})