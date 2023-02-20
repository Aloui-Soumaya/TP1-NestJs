import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './Common/CommonModule';
import { TodoController } from './Todo/TodoController';
import { TodoModule } from './Todo/TodoModule';
import { TodoService } from './Todo/TodoService';

@Module({
  imports: [TodoModule, CommonModule],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule { }
