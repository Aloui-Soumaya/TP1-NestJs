import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoDTO } from 'src/TodoDTO';
import { TodoUpdate } from './ModelDtoUpdate';
import { Todo } from './TodoModel';

@Injectable()
export class TodoService {
    @Inject('UUID') uuid: () => number;
    private todos = [];
    getTodos(): Todo[] {
        return this.todos;
    }
    addTodo(todo: TodoDTO): boolean {
        let newtodo = new Todo(todo.name, todo.description);
        newtodo.id = this.uuid();
        this.todos.push(newtodo);
        return true;
    }
    updateTodo(id: string, body: TodoUpdate): boolean {
        const todo = this.getTodoById(id);
        todo.name = body.name ? body.name : todo.name;
        todo.description = body.description ? body.description : todo.description;
        todo.status = body.status ? body.status : todo.status;
        return true;
    }
    deleteTodo(id: string): boolean {
        const result = this.getTodoById(id);
        this.todos.splice(result.id);
        return true;
    }
    getTodoById(id: string): Todo {
        const result = this.todos.find(todo => todo.id === id);
        if (result) {
            return result;
        }
        else {
            throw new NotFoundException('le todo avec cet id n existe pas')
        }
    }

}
