import { Inject, Injectable } from '@nestjs/common';
import { MY_CONSTANTS } from 'src/config/constantes.config';

@Injectable()
export class UserService {
    constructor(@Inject(MY_CONSTANTS.uuid) private uuid : () => string ,){}


    generateUuid(): string {
        return this.uuid();
      }
}
