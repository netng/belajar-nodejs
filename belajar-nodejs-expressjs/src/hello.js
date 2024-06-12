import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.get('/nandang', (req, res) => {
    res.send('hello nandang')
})

app.listen(3000, () => {
    console.log('Application running on http://localhost:3000')
})