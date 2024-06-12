import express from 'express'
import request from 'supertest'

const app = express()

test('response body', async () => {
    app.get('/', (req, res) => {
        res.set('Content-Type', 'text/html')
        res.send('<html><body>Hello response</body></html>')
    })

    const response = await request(app).get('/')

    expect(response.get('Content-Type')).toContain('text/html')
    expect(response.text).toBe('<html><body>Hello response</body></html>')
})