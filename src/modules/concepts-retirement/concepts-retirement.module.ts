/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ConceptsRetirement, ConceptsRetirementSchema } from './entities/concepts-retirement.entity';
import { ConceptsRetirementController } from './controllers/concepts-retirement.controller';
import { ConceptsRetirementService } from './services/concepts-retirement.service';

@Module({
    imports: [MongooseModule.forFeature([{name: ConceptsRetirement.name, schema: ConceptsRetirementSchema}])],
    controllers: [ConceptsRetirementController],
    providers: [ConceptsRetirementService],
})
export class ConceptsRetirementModule {
}
