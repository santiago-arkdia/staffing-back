/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import { CreateConceptsRetirementDto } from './create-concepts-retirement.dto';
import { PartialType } from '@nestjs/swagger';

@Schema()
export class UpdateConceptsRetirementDto extends PartialType(CreateConceptsRetirementDto) {}

