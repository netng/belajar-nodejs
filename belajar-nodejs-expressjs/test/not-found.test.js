import express from 'express'
import request from 'supertest'

const app = express()

app.get('/', (req, res) => {
    res.send('hello')
})

// not found middleware
app.use((req, res, next) => {
    res.status(404).send('halaman tidak ada')
})

test('halaman ada', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
    expect(response.text).toBe('hello')
})


test('halaman tidak ada', async () => {
    const response = await request(app).get('/halaman-tidak-ada')
    expect(response.status).toBe(404)
    expect(response.text).toBe('halaman tidak ada')
})