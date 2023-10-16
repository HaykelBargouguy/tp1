import { Body, Controller, Post } from '@nestjs/common';

@Controller('todo')
export class TodoController {

@Post()
AddTodo(@Body() body){
    
}



}
