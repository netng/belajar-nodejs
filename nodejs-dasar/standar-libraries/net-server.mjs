import net from 'net'

const server = net.createServer((client) => {
    console.log('client connected')

    client.on('data', (data) => {
        console.info(`received ata ${data.toString()}`)
        client.write(`Hello ${data.toString()}\r\n`)
    })
})

server.listen(3000, 'localhost', () => {
    console.info(`server running at http://localhost:3000`)
})