import { Module } from '@nestjs/common';
import { ConceptsService } from './services/concepts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Concept, ConceptSchema } from './entities/concepts.entity';
import { ConceptsController } from './controllers/concepts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Concept.name, schema: ConceptSchema }]),
  ],
  controllers: [ConceptsController],
  providers: [ConceptsService],
})
export class ConceptsModule {}
