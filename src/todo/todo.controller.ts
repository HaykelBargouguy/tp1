import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/Addtodo.dto';
import { UpdateTodoDto } from './dto/Updatetodo.dto';
import { TodoStatusEnum } from './entities/status.enum';
import { TodoEntity } from './entities/todo.entity';

@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService) {}


@Post()
addTodo(@Body() body :AddTodoDto){
    return  this.todoService.addTodoV1(body)
}

@Put(':id')
modifyTodo(@Body() body :Partial<UpdateTodoDto> ,@Param('id') id : number){
    
    return this.todoService.modifyTodo(id , body)
}
@Delete(':id')
deleteTodo(@Param('id') id ){
    return this.todoService.deleteTodo(id)
}

@Delete('soft/:id')
SoftdeleteTodo(@Param('id') id ){
    return this.todoService.SoftdeleteTodo(id)
}

@Delete('/restore/:id')
RestoredeletedTodo(@Param ('id') id){
    return this.todoService.RestoredeletedTodo(id)
}

@Get('count')
async getTodosCountByStatus(): Promise<{ [key in TodoStatusEnum]: number }> {
  return this.todoService.countTodosByStatus();
}

@Get('findAll')
  async findAll(): Promise<TodoEntity[]> {
    return this.todoService.findAllTodos();

}

  @Get()
  async findTodos(
    @Query('name') name?: string, 
    @Query('description') description?: string,
    @Query('status') status?: TodoStatusEnum
  ): Promise<TodoEntity[]> {
    return this.todoService.findTodosByCriteria(name, description, status);
  }
  @Get('pagination')
  async findTodosByPage(
    @Query('name') name?: string, 
    @Query('description') description?: string,
    @Query('status') status?: TodoStatusEnum,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ): Promise<TodoEntity[]> {
    return this.todoService.findTodosPaginated(name, description, status, limit, offset);
  }




}



