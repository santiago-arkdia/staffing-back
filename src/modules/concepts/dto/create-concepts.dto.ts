/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsArray, IsString } from 'class-validator';
import {CategoriesNovelty} from 'src/modules/categories-novelty/entities/categories-novelties.entity';

@Schema()
export class CreateConceptsDto {

  @IsArray()
  category: CategoriesNovelty[];

  @IsString()
  name: string;

  @IsString()
  performance: string;

  @IsString()
  reportForm: string;

  @IsString()
  additionalText: string
}
