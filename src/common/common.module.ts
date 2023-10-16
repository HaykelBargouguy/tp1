import { Global, Module } from '@nestjs/common';
import { MY_CONSTANTS } from 'src/config/constantes.config';
import { v4 as uuid } from 'uuid';

@Global()
@Module({
   providers: [
          {
            provide: MY_CONSTANTS.uuid,
            useValue: uuid,
          },
        ],
    exports:[MY_CONSTANTS.uuid]
      })
      export class CommonModule {} 