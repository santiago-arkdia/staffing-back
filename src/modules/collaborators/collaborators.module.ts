/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {CollaboratorService} from './services/collaborators.service';
import {MongooseModule} from '@nestjs/mongoose';
import {
    Collaborator,
    CollaboratorSchema,
} from './entities/collaborators.entity';
import {CollaboratorController} from './controllers/collaborators.controller';
import {CollaboratorCoreModule} from "../collaborator-core/collaborator-core.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Collaborator.name, schema: CollaboratorSchema},
        ]),
        CollaboratorCoreModule,
    ],
    controllers: [CollaboratorController],
    providers: [CollaboratorService],
})
export class CollaboratorModule {
}
