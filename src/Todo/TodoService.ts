import { BadRequestException, Inject, Injectable, NotFoundException, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../Entity/Todo.entity';
import { TodoAddDTO } from '../Todo/ModelDtoAjout';
import { Like, Repository } from 'typeorm';
import { TodoUpdate } from './ModelDtoUpdate';
import { State } from "../Status";
import { Todo } from './TodoModel';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
    ) { }
    @Inject('UUID') uuid: () => number;
    private todos = [];
    getTodos(): Todo[] {
        return this.todos;
    }
    addTodo(todo: TodoAddDTO): boolean {
        let newtodo = new Todo(todo.name, todo.description, "id");
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
    /* with database */
    async postTodo(todo: TodoAddDTO, userId: string): Promise<TodoEntity> {
        let newtodo = new Todo(todo.name, todo.description, userId);
        return await this.todoRepo.save(newtodo);
    }
    async updateTodov2(id: number, body: TodoUpdate, userId: string) {
        const newTodo: TodoEntity = await this.todoRepo.preload({
            id,
            name: body.name,
            description: body.description,
            status: body.status,
            userId
        });
        console.log("*************************", newTodo);
        if (!newTodo) throw new NotFoundException;
        return await this.todoRepo.save(newTodo);
    }
    async deleteTodov2(id: string) {
        return await this.todoRepo.delete(id);
    }
    async deleteTodov3(id: number) {
        const todo = await this.todoRepo.findOneById(id);
        console.log("todo:", todo);
        if (!todo) {
            throw new NotFoundException('not found');
        }
        return await this.todoRepo.softDelete(id);
    }
    async restoreTodo(id: number) {
        return await this.todoRepo.restore(id);
    }
    async countByStatus() {
        return "actif :" + await this.todoRepo.countBy({ status: State.actif }) +
            " waiting : " + await this.todoRepo.countBy({ status: State.waiting }) +
            "done :" + await this.todoRepo.countBy({ status: State.done })
    }
    async getTodov2() {
        return await this.todoRepo.find();
    }
    async getTodobyparamv2(statusParam, data): Promise<TodoEntity[]> {
        const qb = this.todoRepo.createQueryBuilder("todo");
        qb.where("todo.name Like :data", { data: '%' + data + '%' })
            .orWhere("todo.description Like :data", { data: '%' + data + '%' })
            .andWhere("todo.status= :statusParam", { statusParam: statusParam });
        if (!qb.getMany()) throw new NotFoundException();
        return await qb.getMany();
    }
    async getTodobyparamv1(statusParam, data): Promise<TodoEntity[]> {
        const qb = this.todoRepo.createQueryBuilder("todo");
        qb.where("todo.name Like :data", { data: '%' + data + '%' })
            .orWhere("todo.description Like :data", { data: '%' + data + '%' })
            .orWhere("todo.status= :statusParam", { statusParam: statusParam });
        if (!qb.getMany()) throw new NotFoundException();
        return await qb.getMany();
    }
    async findByIDv2(id: number): Promise<TodoEntity> {
        const todo = await this.todoRepo.findOne({ where: [{ id: id }] });
        if (!todo) throw new BadRequestException("le todo n'existe pas");
        return todo;
    }
    async getTodosPaginated(param): Promise<TodoEntity[]> {
        return await this.todoRepo.find({ skip: (param.page - 1) * param.take, take: param.take });
    }

}