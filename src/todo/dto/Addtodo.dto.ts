import { IsNotEmpty, Length, MinLength } from "class-validator";
import { MY_VALIDATION } from "./dto.validation";

export class AddTodoDto {

    @IsNotEmpty({message : MY_VALIDATION.NAME_REQUIRED})
    @Length(3,10,{message:`La taille de votre $property $value est courte, la taille minimale de $property est ${MY_VALIDATION.DESCRIPTION_MIN_LENGTH} et la taille maximale de $property est ${MY_VALIDATION.NAME_MAX_LENGTH}`})
    name : string ;


    @IsNotEmpty({ message : MY_VALIDATION.DESCRIPTION_REQUIRED})
    @MinLength(10,{message :MY_VALIDATION.DESCRIPTION_MIN_LENGTH})
    description :string ; 

    
}