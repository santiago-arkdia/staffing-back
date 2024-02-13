/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NoveltySocialSecurityService } from './services/novelty-social-security.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NNoveltySocialSecuritySchema, NoveltySocialSecurity } from './entities/novelty-social-security.entity';
import { NoveltySocialSecurityController } from './controllers/novelty-social-security.controller';
import {Counter, CounterSchema} from "./entities/counter.entity";
import {Concept, ConceptSchema} from "../concepts/entities/concepts.entity";
import { Roles, RolesSchema } from '../roles/entities/roles.entity';
import { ConceptsSocialSecurity, ConceptsSocialSecuritySchema } from '../concepts-social-security/entities/concepts-social-security.entity';
import { Client, ClientSchema } from '../clients/entities/client.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NoveltySocialSecurity.name, schema: NNoveltySocialSecuritySchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
    MongooseModule.forFeature([{ name: Concept.name, schema: ConceptSchema }]),
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
    MongooseModule.forFeature([{ name: ConceptsSocialSecurity.name, schema: ConceptsSocialSecuritySchema }]),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [NoveltySocialSecurityController],
  providers: [NoveltySocialSecurityService],
})
export class NoveltySocialSecurityModule {}
