/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesNoveltiesDto } from './create-categories-novelties.dto';

@Schema()
export class UpdateModuleParameterizationsDto extends PartialType(CreateCategoriesNoveltiesDto) {}