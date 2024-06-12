import express from 'express'
import request from 'supertest'


const app = express()

test('response header', async () => {
    app.get('/', (req, res) => {
        res.set({
            'X-Powered-By': 'Nandang Super',
            'X-Author': 'Nandang'
        })
        res.end()
    })

    const response = await request(app).get('/')

    expect(response.get('X-powered-By')).toBe('Nandang Super')
    expect(response.get('X-Author')).toBe('Nandang')
})