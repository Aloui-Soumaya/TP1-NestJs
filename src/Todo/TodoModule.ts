import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/Common/CommonModule';
import { TodoEntity } from 'src/Entity/Todo.entity';
import { TodoController } from './TodoController';
import { TodoService } from './TodoService';

@Module({
    imports: [CommonModule, TypeOrmModule.forFeature([TodoEntity])],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule { }
