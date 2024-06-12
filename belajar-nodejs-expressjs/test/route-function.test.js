import express from 'express'
import request from 'supertest'

const app = express()


app.route('/products')
    .get((req, res) => {
        res.send('get products')
    })
    .post((req, res) => {
        res.send('post product')
    })
    .put((req, res) => {
        res.send('put product')
    })

test('function route', async () => {
    let response = await request(app).get('/products')
    expect(response.text).toBe('get products')

    response = await request(app).post('/products')
    expect(response.text).toBe('post product')

    response = await request(app).put('/products')
    expect(response.text).toBe('put product')
})