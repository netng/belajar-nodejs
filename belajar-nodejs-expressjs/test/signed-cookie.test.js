import cookieParser, { signedCookie } from 'cookie-parser'
import express, { json } from 'express'
import request from 'supertest'

const app = express()

app.use(cookieParser('COOKIESECRET'))
app.use(json())

app.get('/', (req, res) => {
    const name = req.signedCookies['Login']
    res.send(`Hello ${name}`)
})

app.post('/login', (req, res) => {
    const name = req.body.name
    res.cookie('Login', name, { path: '/', signed: true })
    res.send(`Hello ${name}`)
})

test('signed cookie', async () => {
    const response = await request(app)
        .get('/')
        .set('Cookie', 'Login=s%3Anandang.CQ%2BxPamr43wsP81SZuHCz1KAGIxjuncwdkBXrQPMxKA; Path=/')
    
    console.log(response.get('Set-Cookie'))
    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello nandang')
})

test('cookie write /login', async () => {
    const response = await request(app)
        .post('/login')
        .send({ name: 'nandang' })
    
    console.log(response.get('Set-Cookie').toString())
    expect(response.status).toBe(200)
    expect(response.get('Set-Cookie').toString()).toContain('nandang')
    expect(response.text).toBe('Hello nandang')
})