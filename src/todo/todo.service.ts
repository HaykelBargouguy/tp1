import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { AddTodoDto } from './dto/Addtodo.dto';
import { UpdateTodoDto } from './dto/Updatetodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}


  async modifyTodo(id : number, todo: Partial<UpdateTodoDto>): Promise<TodoEntity> {
    const EntityToModify = await this.todoRepository.findOne({where : {id}})
    
    if (!EntityToModify) {
      throw new Error('Todo is not found');
  }

  if (todo.name) {
      EntityToModify.name = todo.name;
  }
  if (todo.description) {
      EntityToModify.description = todo.description;
  }
  if (todo.status) {
      EntityToModify.status = todo.status;
  }

  return await this.todoRepository.save(EntityToModify);

}

      
  

  // Version 1 : Utilisation directe de save
  /*async addTodoV1(newtodo :AddTodoDto): Promise<TodoEntity> {
    const todo = this.todoRepository.create(newtodo);
    return await this.todoRepository.save(newtodo);
  }*/

  // Version 2 : Création manuelle puis utilisation de save
    async addTodoV2(todo:AddTodoDto): Promise<TodoEntity> {
    const name = todo.name;
    const description = todo.description;
    const newtodo = this.todoRepository.create({name, description})
    return await this.todoRepository.save(newtodo);
  }



}
