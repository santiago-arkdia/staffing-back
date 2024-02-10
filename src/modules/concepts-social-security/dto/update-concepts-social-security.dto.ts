/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import { CreateConceptsSocialSecurityDto } from './create-concepts-social-security.dto';
import { PartialType } from '@nestjs/swagger';

@Schema()
export class UpdateConceptsSocialSecurityDto extends PartialType(CreateConceptsSocialSecurityDto) {}

