import express from 'express'
import request from 'supertest'

const app = express()

test('response redirect', async () => {
    app.get('/', (req, res) => {
        res.redirect('/to-next-page')
    })

    const response = await request(app).get('/')

    expect(response.status).toBe(302)
    expect(response.get('Location')).toBe('/to-next-page')
})