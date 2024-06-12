import express from 'express'
import mustacheExpress from 'mustache-express'
import request from 'supertest'

const app = express()

// mustache config
app.set('views', __dirname + '/views')
app.set('view engine', 'html')
app.engine('html', mustacheExpress())

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Mustache Express',
        say: 'Hello Mustache'
    })
})

test('mustache in express', async () => {
    const response = await request(app).get('/')
    expect(response.text).toContain('Mustache Express')
    expect(response.text).toContain('Hello Mustache')
})