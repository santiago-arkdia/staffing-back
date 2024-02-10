/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesNoveltiesSocialSecurityDto } from './create-categories-social-security.dto';

@Schema()
export class UpdateModuleParameterizationsDto extends PartialType(CreateCategoriesNoveltiesSocialSecurityDto) {}