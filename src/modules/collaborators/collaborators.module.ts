import { Module } from '@nestjs/common';
import { CollaboratorService } from './services/collaborators.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Collaborator,
  CollaboratorSchema,
} from './entities/collaborators.entity';
import { CollaboratorController } from './controllers/collaborators.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collaborator.name, schema: CollaboratorSchema },
    ]),
  ],
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
})
export class CollaboratorModule {}
