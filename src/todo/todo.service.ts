import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { AddTodoDto } from './dto/Addtodo.dto';
import { UpdateTodoDto } from './dto/Updatetodo.dto';
import { TodoStatusEnum } from './entities/status.enum';
@Injectable()
export class TodoService {
  sectionRepository: any;
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) { }


  async modifyTodo(id: number, todo: Partial<UpdateTodoDto>): Promise<TodoEntity> {
    const EntityToModify = await this.todoRepository.findOne({ where: { id } })

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
  async addTodoV1(newtodo: AddTodoDto) {
    const todo = this.todoRepository.create(newtodo);
    return await this.todoRepository.save(newtodo);
  }

  // Version 2 : Création manuelle puis utilisation de save
  /* async addTodoV2(todo:AddTodoDto): Promise<TodoEntity> {
   const name = todo.name;
   const description = todo.description;
   const newtodo = this.todoRepository.create({name, description})
   return await this.todoRepository.save(newtodo);*/



  async deleteTodo(id):Promise<DeleteResult> {
      return await this.todoRepository.delete(id);
      } 
  
    
    /*const EntityToDelete = await this.todoRepository.findOne({ where: { id } })

    if (!EntityToDelete) {
      throw new Error('Todo is not found');
    }
    await this.todoRepository.delete(EntityToDelete);
    return `the entity with the id ${id} is deleted successfuly `
  }*/

  async SoftdeleteTodo(id: number): Promise<UpdateResult> {
      return await this.todoRepository.softDelete(id);
      }

  async RestoredeletedTodo(id: number) {
      return await this.todoRepository.restore(id);
       
    /*const EntityToDelete = await this.todoRepository.findOne({ where: { id } })

    if (!EntityToDelete) {
      throw new Error('Todo is not found');
    }
    await this.todoRepository.(EntityToDelete);
    return `the entity with the id ${id} is deleted successfuly `*/
  }

  async countTodosByStatus(): Promise<{ [key in TodoStatusEnum]: number }> {
    const counts: { [key in TodoStatusEnum]: number } = {
      TODO: await this.todoRepository.count({ where: { status: TodoStatusEnum.TODO } }),
      IN_PROGRESS: await this.todoRepository.count({ where: { status: TodoStatusEnum.IN_PROGRESS } }),
      DONE: await this.todoRepository.count({ where: { status: TodoStatusEnum.DONE } }),
    };
    return counts;
  }

  async findAllTodos(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }
// src/todo/todo.service.ts

async findTodosByCriteria(name?: string, description?: string, status?: TodoStatusEnum): Promise<TodoEntity[]> {
  const query = this.todoRepository.createQueryBuilder('todo');

  if (name) {
    query.andWhere('todo.name LIKE :name', { name: `%${name}%` });
  }

  if (description) {
    query.andWhere('todo.description LIKE :description', { description: `%${description}%` });
  }

  if (status) {
    query.andWhere('todo.status = :status', { status });
  }

  return await query.getMany();
}
// src/todo/todo.service.ts

async findTodosPaginated(
  name?: string,
  description?: string,
  status?: TodoStatusEnum,
  limit?: number,
  offset?: number
): Promise<TodoEntity[]> {
  const query = this.todoRepository.createQueryBuilder('todo');

  if (name) {
    query.andWhere('todo.name LIKE :name', { name: `%${name}%` });
  }

  if (description) {
    query.andWhere('todo.description LIKE :description', { description: `%${description}%` });
  }

  if (status) {
    query.andWhere('todo.status = :status', { status });
  }

  if (limit) {
    query.limit(limit);
  }

  if (offset) {
    query.offset(offset);
  }

  return await query.getMany();
}





  
  
}