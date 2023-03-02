import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Version } from '@nestjs/common';
import { TodoEntity } from 'src/Entity/Todo.entity';
import { TodoAddDTO } from 'src/Todo/ModelDtoAjout';
import { TodoUpdate } from 'src/Todo/ModelDtoUpdate';
import { Todo } from 'src/Todo/TodoModel';
import { ParamDto } from './ParamDto';
import { TodoService } from './TodoService';
@Controller('todo-controller')
export class TodoController {
    constructor(private service: TodoService) {
    }
    private todos = [];
    @Get('/getAll')
    @Version('1')
    getTodos(): Todo[] {
        return this.service.getTodos();
    }
    @Get('/getbyid/:id')
    @Version('1')
    getByIdTodos(@Param('id') id): Todo {
        return this.service.getTodoById(id);
    }
    @Delete('/deletebyid/:id')
    @Version('1')
    deleteByIdTodos(@Param('id') id): boolean {
        return this.service.deleteTodo(id);
    }
    @Put('/updatebyid/:id')
    @Version('1')
    UpdateByIdTodos(@Param('id') id,
        @Body() body: TodoUpdate): boolean {
        return this.service.updateTodo(id, body);
    }

    @Post('/add')
    @Version('1')
    postTodos(@Body() todo: TodoAddDTO): boolean {
        return this.service.addTodo(todo);
    }

    @Post('/add')
    @Version('2')
    postTodosV2(@Body() todo: TodoAddDTO): Promise<TodoEntity> {
        return this.service.postTodo(todo);
    }
    @Put('/updatebyid/:id')
    @Version('2')
    UpdateByIdTodosV2(@Param('id') id,
        @Body() body: TodoUpdate) {
        return this.service.updateTodov2(id, body);
    }
    @Delete('/deletebyid/:id')
    @Version('2')
    deleteByIdTodosv2(@Param('id') id) {
        return this.service.deleteTodov2(id);
    }
    @Delete('/deletebyid/:id')
    @Version('3')
    deleteByIdTodosv3(@Param('id') id) {
        return this.service.deleteTodov3(id);
    }
    @Post('/restorebyid/:id')
    @Version('1')
    restoreByIdTodosv1(@Param('id') id) {
        return this.service.restoreTodo(id);
    }
    @Get('/countByStatus')
    @Version('1')
    countByStatus() {
        return this.service.countByStatus();
    }
    @Get('/getAll')
    @Version('2')
    getAll() {
        return this.service.getTodov2();
    }
    @Get('/getByparam')
    @Version('1')
    async getTodoByStatusAndData(@Query() queryParam: ParamDto) {
        const { status, data } = queryParam;
        return await this.service.getTodobyparamv1(status, data);
    }
    @Get('/getByparam')
    @Version('2')
    async getTodoByStatusAndDatav2(@Query() queryParam: ParamDto) {
        const { status, data } = queryParam;
        return await this.service.getTodobyparamv2(status, data);
    }
    @Get('/getById/:id')
    @Version('2')
    async getTodoByIDv2(@Param('id') id) {
        return await this.service.findByIDv2(id);
    }
    @Get('/:page/:take')
    async getTodosPaginated(@Param() params) {
        return await this.service.getTodosPaginated(params);
    }



}
