/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NoveltyService } from './services/novelty.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Novelty, NoveltySchema } from './entities/novelty.entity';
import { NoveltyController } from './controllers/novelty.controller';
import {Counter, CounterSchema} from "./entities/counter.entity";
import {Concept, ConceptSchema} from "../concepts/entities/concepts.entity";
import { Roles, RolesSchema } from '../roles/entities/roles.entity';
import { NNoveltyRetirementSchema, NoveltyRetirement } from '../novelty-retirement/entities/novelty-retirement.entity';
import { Client, ClientSchema } from '../clients/entities/client.entity';
import { NNoveltySocialSecuritySchema, NoveltySocialSecurity } from '../novelty-social-security/entities/novelty-social-security.entity';
import { Payrolls, PayrollsSchema } from '../payrolls/entities/payrolls.entity';
import { NoveltyTemporAppService } from './services/novelty-temporapp.service';
import { ConceptsService } from '../concepts/services/concepts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Novelty.name, schema: NoveltySchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
    MongooseModule.forFeature([{ name: Concept.name, schema: ConceptSchema }]),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
    MongooseModule.forFeature([{ name: NoveltyRetirement.name, schema: NNoveltyRetirementSchema }]),
    MongooseModule.forFeature([{ name: NoveltySocialSecurity.name, schema: NNoveltySocialSecuritySchema }]),
    MongooseModule.forFeature([{ name: Payrolls.name, schema: PayrollsSchema }]),
  ],
  controllers: [NoveltyController],
  providers: [NoveltyService,NoveltyTemporAppService,ConceptsService],
  exports: [NoveltyTemporAppService]
})
export class NoveltyModule {}
