/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import { CreateModuleParameterizationsDto } from './create-module-parameterization.dto';
import { PartialType } from '@nestjs/swagger';

@Schema()
export class UpdateModuleParameterizationsDto extends PartialType(CreateModuleParameterizationsDto) {}