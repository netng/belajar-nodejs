import express from 'express'
import request from 'supertest'

const app = express()

// app.use(express.static(__dirname + '/static'))
app.use('/static', express.static(__dirname + '/static')) // with prefix '/static

app.get('/', (req, res) => {
    res.send('hello node')
})

app.get('/contoh.txt', (req, res) => {
    res.send('hello node')
})


test('/', async () => {
    const response = await request(app).get('/')
    expect(response.text).toBe('hello node')
})

test('/contoh.txt', async () => {
    const response = await request(app).get('/contoh.txt')
    expect(response.text).toBe('hello node')
})

test('/static/contoh.txt', async () => {
    const response = await request(app).get('/static/contoh.txt')
    expect(response.text).toBe('ini contoh')
})