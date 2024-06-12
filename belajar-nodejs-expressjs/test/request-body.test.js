import express from 'express'
import request from 'supertest'
import fileUpload from 'express-fileupload'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(fileUpload())

app.post('/json', (req, res) => {
    const name = req.body.name
    res.json({
        hello: `hello ${name}`
    })
})

app.post('/form', (req, res) => {
    const name = req.body.name
    res.json({
        hello: `hello ${name}`
    })
})

app.post('/file', async (req, res) => {
    const file = req.files.article
    console.log(req.files)
    await file.mv(__dirname + '/uploads/' + file.name)
    res.send(`hello ${req.body.name}, you are uploaded file ${file.name}`)
})

test('file upload', async () => {
    const response = await request(app)
        .post('/file')
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'nandang')
        .attach('article', __dirname + '/static/contoh.txt')
    
    expect(response.text).toBe('hello nandang, you are uploaded file contoh.txt')
} )

test('http body', async () => {
    const response = await request(app)
        .post('/json')
        .set('Content-Type', 'application/json')
        .send({name: 'nandang'})
    
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
        hello: 'hello nandang'
    })
})

test('http request form', async () => {
    const response = await request(app)
        .post('/form')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('name=nandang')
    
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
        hello: 'hello nandang'
    })
})