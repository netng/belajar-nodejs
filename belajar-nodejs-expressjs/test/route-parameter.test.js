import express from 'express'
import request from 'supertest'

const app = express()


app.get('/products/:id', (req, res) => {
    res.send(`Product: ${req.params.id}`)
})

app.get('/categories/:id(\\d+)', (req, res) => {
    res.send(`Category: ${req.params.id}`)
})

test('route parameter', async () => {
    let response = await request(app).get('/products/abcd123')
    expect(response.text).toBe('Product: abcd123')

    response = await request(app).get('/categories/salah')
    expect(response.status).toBe(404)

    response = await request(app).get('/categories/1234')
    expect(response.text).toBe('Category: 1234')

})