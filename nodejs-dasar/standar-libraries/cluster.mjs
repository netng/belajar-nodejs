import cluster from 'node:cluster'
import process from 'node:process'
import { availableParallelism } from 'node:os'
import http from 'node:http'

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
    console.info(`Primary ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.info(`working ${worker.id} is exited with code ${code}, signal ${signal}`)
        cluster.fork()
    })
}

if (cluster.isWorker) {
    console.info(`Worker ${process.pid} is running`)
    const server = http.createServer((request, response) => {
        response.write(`response from ${process.pid}`)
        response.end()
        process.exit()
    })

    server.listen(3000, () => {
        console.info(`server running at http://localhost:3000, worker ${process.pid}`)
    })
}