import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '../Entity/Todo.entity';
import { TodoController } from './TodoController';
import { TodoService } from './TodoService';
import { CommonModule } from '../Common/CommonModule';

@Module({
    imports: [CommonModule, TypeOrmModule.forFeature([TodoEntity])],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule { }
