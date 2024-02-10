/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {ClientsTriService} from "./services/clientsTri.service";
import {ClientsTriController} from "./controllers/clientsTri.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from 'src/modules/clients/entities/client.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Client.name, schema: ClientSchema},
        ]),
    ],
    controllers: [ClientsTriController],
    providers: [ClientsTriService]
})
export class ClientsTriModule {}
