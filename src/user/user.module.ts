import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommonModule } from 'src/common/common.module';
import { MY_CONSTANTS } from 'src/config/constantes.config';
import { v4 as uuid } from 'uuid';


@Module({
    imports: [],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
