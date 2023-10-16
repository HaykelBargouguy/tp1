import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userservice :UserService){}

    @Get('uuid')
    getUuid(){
        return this.userservice.generateUuid() ;
    
    }
}
 