/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {PucService} from './services/puc.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Puc, PucSchema} from './entities/puc.entity';
import {PucController} from './controllers/puc.controller';
import { Client, ClientSchema } from '../clients/entities/client.entity';

@Module({
    imports: [MongooseModule.forFeature([ 
        {name: Puc.name, schema: PucSchema},
        {name: Client.name, schema: ClientSchema}
     ])],
    controllers: [PucController],
    providers: [PucService],
})
export class PucModule {
}
