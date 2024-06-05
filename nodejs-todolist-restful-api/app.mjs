import http from 'node:http'
import { TodoListService } from './todolist-service.mjs'

const HOST = 'localhost'
const PORT = 3000
const service = new TodoListService()

const server = http.createServer((request, response) => {

    response.setHeader('Content-Type', 'application/json')

    // get list of todos
    if (request.method === 'GET') {
        service.getTodos(request, response)
    }

    // add a new todo
    if (request.method === 'POST') {
        service.addTodo(request, response)
    }
    
    // update a new todo
    if (request.method === 'PUT') {
        service.updateTodo(request, response)
    }

    // destroy a todo
    if (request.method === 'DELETE') {
        service.deleteTodo(request, response)
    }
})

server.listen(PORT, HOST, () => {
    console.info(`server running at http://${HOST}:${PORT} `)
})