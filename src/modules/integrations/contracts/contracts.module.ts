/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {ContractsController} from "./controllers/contracts.controller";
import {ContractsService} from "./services/contracts.service";
import { MongooseModule } from '@nestjs/mongoose';
import { Contract } from 'src/shared/models/contract';
import { ContractSchema } from 'src/modules/contracts/entities/contracts.entity';
import { Client, ClientSchema } from 'src/modules/clients/entities/client.entity';
import { Collaborator, CollaboratorSchema } from 'src/modules/collaborators/entities/collaborators.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Contract.name, schema: ContractSchema }]),
        MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
        MongooseModule.forFeature([{ name: Collaborator.name, schema: CollaboratorSchema}]),
    ],
    controllers: [ContractsController],
    providers: [ContractsService],
    exports: [ContractsService]

})
export class ContractsTriModule {
}
