import express from 'express'
import request from 'supertest'

const app = express()

const router = express.Router()

router.use((req, res, next) => {
    console.info(`Receive request ${req.originalUrl}`)
    next()
})

router.get('/feature/a', (req, res) => {
    res.send('feature a')
})

test('router 404', async () => {
    let response = await request(app).get('/feature/a')
    expect(response.status).toBe(404)

})

test('router feature/a', async () => {
    app.use(router)
    let response = await request(app).get('/feature/a')
    expect(response.text).toBe('feature a')

})