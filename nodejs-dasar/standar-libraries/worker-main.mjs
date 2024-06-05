import { threadId, Worker } from 'worker_threads'

const worker1 = new Worker('./worker.mjs')
const worker2 = new Worker('./worker.mjs')

worker1.on('message', (message) => {
    console.info(`thread-${threadId} received message from woker1: ${message}`)
})

worker2.on('message', (message) => {
    console.info(`thread-${threadId} received message from woker2: ${message}`)
})

worker1.postMessage(10)
worker2.postMessage(10)