import cookieParser from 'cookie-parser'
import express, { json } from 'express'
import request from 'supertest'

const app = express()

app.use(cookieParser())
app.use(json())

app.get('/', (req, res) => {
    const name = req.cookies['name']
    res.send(`hello ${name}`)
})

app.post('/login', (req, res) => {
    const name = req.body.name
    res.cookie('Login', name, { path: '/' })
    res.send(`Hello ${name}`)
})

test('cookie write', async () => {
    const response = await request(app)
        .post('/login')
        .send({ name: 'nandang' })
    
    expect(response.status).toBe(200)
    expect(response.get('Set-Cookie').toString()).toBe('Login=nandang; Path=/')
})

test('cookie', async () => {
    let response = await request(app)
        .get('/')
        .set('Cookie', 'name=nandang;author=nandang sopyan')
    
    expect(response.status).toBe(200)
    expect(response.text).toBe('hello nandang')
})
