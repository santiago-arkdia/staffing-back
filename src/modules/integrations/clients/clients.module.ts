/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {ClientsTriService} from "./services/clientsTri.service";
import {ClientsTriController} from "./controllers/clientsTri.controller";

@Module({
    imports: [],
    controllers: [ClientsTriController],
    providers: [ClientsTriService]
})
export class ClientsTriModule {}
