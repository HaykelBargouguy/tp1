import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/entities/todo.entity';


@Module({
  imports: [CommonModule, UserModule, TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tp11',
      entities: [TodoEntity],
      synchronize: true,
      logging:true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
