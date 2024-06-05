export class TodoListService {

    todos = ['belajar', 'node', 'js']

    getJsonTodo() {
        return JSON.stringify({
            code: 200,
            status: 'OK',
            data: this.todos.map((value, index) => (
                {
                    id: index,
                    todo: value
                }
            ))
        })
    }

    getTodos(request, response) {
        response.write(this.getJsonTodo())
        response.end()
    }

    addTodo(request, response) {
        request.on('data', (data) => {
            const body = JSON.parse(data.toString())
            this.todos.push(body.todo)
            
            response.write(this.getJsonTodo())
            response.end()
        })
    }

    updateTodo(request, response) {
        request.on('data', (data) => {
            const body = JSON.parse(data.toString())

            if (this.todos[body.id]) {
                this.todos[body.id] = body.todo
            }
            
            response.write(this.getJsonTodo())
            response.end()
        })
    }

    deleteTodo(request, response) {
        request.on('data', (data) => {
            const body = JSON.parse(data.toString())

            if (this.todos[body.id]) {
                this.todos.splice(body.id, 1)
            }

            response.write(this.getJsonTodo())
            response.end()
        })
    }
}