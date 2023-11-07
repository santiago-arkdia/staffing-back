/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsBoolean, IsString} from 'class-validator';
import {CategoriesNovelty} from 'src/modules/categories-novelty/entities/categories-novelties.entity';
import { Roles } from 'src/modules/roles/entities/roles.entity';

@Schema()
export class CreateConceptsDto {

  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsBoolean()
  benefit: string;

  @IsString()
  reportType: string;

  @IsString()
  category: CategoriesNovelty;

  @IsString()
  registers: Roles

  @IsString()
  approves: Roles
}
