/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NoveltyRetirementService } from './services/novelty-retirement.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NNoveltyRetirementSchema, NoveltyRetirement } from './entities/novelty-retirement.entity';
import { NoveltyRetirementController } from './controllers/novelty-retirement.controller';
import {Counter, CounterSchema} from "./entities/counter.entity";
import {Concept, ConceptSchema} from "../concepts/entities/concepts.entity";
import { Roles, RolesSchema } from '../roles/entities/roles.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NoveltyRetirement.name, schema: NNoveltyRetirementSchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
    MongooseModule.forFeature([{ name: Concept.name, schema: ConceptSchema }]),
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
  ],
  controllers: [NoveltyRetirementController],
  providers: [NoveltyRetirementService],
})
export class NoveltyRetirementModule {}
