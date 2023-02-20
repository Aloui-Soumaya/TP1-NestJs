import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoDTO } from 'src/Todo/ModelDtoAjout';
import { TodoUpdate } from 'src/Todo/ModelDtoUpdate';
import { Todo } from 'src/Todo/TodoModel';
import { NotFoundException } from '@nestjs/common'
import { TodoService } from './TodoService';
@Controller('todo-controller')
export class TodoController {
    constructor(private service: TodoService) {
    }
    private todos = [];
    @Get()
    getTodos(): Todo[] {
        return this.service.getTodos();
    }
    @Get('/getbyid/:id')
    getByIdTodos(@Param('id') id): Todo {
        return this.service.getTodoById(id);
    }
    @Delete('/deletebyid/:id')
    deleteByIdTodos(@Param('id') id): boolean {
        return this.service.deleteTodo(id);
    }
    @Put('/updatebyid/:id')
    UpdateByIdTodos(@Param('id') id,
        @Body() body: TodoUpdate): boolean {
        return this.service.updateTodo(id, body);
    }

    @Post('/add')
    postTodos(@Body() todo: TodoDTO): boolean {
        return this.service.addTodo(todo);
    }
}
