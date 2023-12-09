/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsBoolean, IsOptional, IsString} from 'class-validator';
import {CategoriesNovelty} from 'src/modules/categories-novelty/entities/categories-novelties.entity';
import { Roles } from 'src/modules/roles/entities/roles.entity';

@Schema()
export class CreateConceptsDto {

  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  benefit: string;

  @IsString()
  @IsOptional()
  reportType: string;

  @IsString()
  @IsOptional()
  categoryNovelty: CategoriesNovelty;

  @IsString()
  @IsOptional()
  registers: Roles

  @IsString()
  @IsOptional()
  approves: Roles
}
