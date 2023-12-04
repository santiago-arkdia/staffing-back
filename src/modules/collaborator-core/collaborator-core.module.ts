/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CollaboratorCore, CollaboratorCoreSchema} from "./entities/collaborator-core";
import {CollaboratorCoreController} from "./controllers/collaborator-core.controller";
import {CollaboratorCoreService} from "./services/collaborator-core.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: CollaboratorCore.name, schema: CollaboratorCoreSchema },
        ]),
    ],
    controllers: [CollaboratorCoreController],
    providers: [CollaboratorCoreService],
    exports: [CollaboratorCoreService]
})
export class CollaboratorCoreModule {}
