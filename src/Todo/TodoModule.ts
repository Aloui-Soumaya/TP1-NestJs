import { Module } from '@nestjs/common';
import { CommonModule } from 'src/Common/CommonModule';
import { TodoController } from './TodoController';
import { TodoService } from './TodoService';

@Module({
    imports: [TodoModule, CommonModule],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule { }
