import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './Common/CommonModule';
import { CustomController } from './Custom/CustomController';
import { TodoController } from './Todo/TodoController';
import { TodoModule } from './Todo/TodoModule';
import { TodoService } from './Todo/TodoService';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TodoModule, CommonModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '166679',
      database: 'tp2',
      autoLoadEntities: true,
      synchronize: true,
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
