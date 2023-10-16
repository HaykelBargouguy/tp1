import { PartialType } from '@nestjs/mapped-types';
import { AddTodoDto } from './Addtodo.dto';
import { TodoStatusEnum } from '../entities/status.enum';
import { IsEnum, IsOptional } from 'class-validator';



export class UpdateTodoDtoClass extends AddTodoDto {

    @IsOptional()
    @IsEnum(TodoStatusEnum, {
        message: `Le statut doit être l'une des valeurs suivantes: ${Object.values(TodoStatusEnum).join(', ')}`
    })
    status?: TodoStatusEnum; // Le ? indique que c'est un champ optionnel

}
export class UpdateTodoDto extends PartialType(UpdateTodoDtoClass) { }
