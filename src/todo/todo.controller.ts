import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/Addtodo.dto';
import { UpdateTodoDto } from './dto/Updatetodo.dto';

@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService) {}


@Post()
addTodo(@Body() body :AddTodoDto){
    return  this.todoService.addTodoV2(body)
}

@Put(':id')
modifyTodo(@Body() body :Partial<UpdateTodoDto> ,@Param('id') id : number){
    
    return this.todoService.modifyTodo(id , body)
}
}
