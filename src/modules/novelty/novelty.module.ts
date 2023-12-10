/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NoveltyService } from './services/novelty.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Novelty, NoveltySchema } from './entities/novelty.entity';
import { NoveltyController } from './controllers/novelty.controller';
import {Counter, CounterSchema} from "./entities/counter.entity";
import {Concept, ConceptSchema} from "../concepts/entities/concepts.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Novelty.name, schema: NoveltySchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
    MongooseModule.forFeature([{ name: Concept.name, schema: ConceptSchema }]),
  ],
  controllers: [NoveltyController],
  providers: [NoveltyService],
})
export class NoveltyModule {}
