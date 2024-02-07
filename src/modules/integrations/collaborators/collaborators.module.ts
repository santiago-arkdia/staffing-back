import { Module } from '@nestjs/common';
import { CollaboratorsService } from './services/collaborators.service';
import { CollaboratorsController } from './controllers/collaborators.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collaborator, CollaboratorSchema } from 'src/modules/collaborators/entities/collaborators.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Collaborator.name, schema: CollaboratorSchema},
        ]),
    ],
    controllers: [CollaboratorsController],
    providers: [CollaboratorsService]
})
export class CollaboratorsTriModule {}