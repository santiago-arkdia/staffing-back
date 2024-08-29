/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsBoolean, IsOptional, IsString, IsObject} from 'class-validator';
import {CategoriesNovelty} from 'src/modules/categories-novelty/entities/categories-novelties.entity';

@Schema()
export class CreateConceptsDto {

  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  categoryNovelty: CategoriesNovelty;

  @IsString()
  @IsOptional()
  state: number

  @IsString()
  @IsOptional()
  approves: string

  @IsObject()
  @IsOptional()
  formObject: Record<string, any>;

  // @IsBoolean()
  // @IsOptional()
  // benefit: string;

  // @IsString()
  // @IsOptional()
  // reportType: string;

  // @IsString()
  // @IsOptional()
  // registers: string

  // @IsString()
  // @IsOptional()
  // applyDate: boolean

  // @IsString()
  // @IsOptional()
  // manages: string

  // @IsString()
  // @IsOptional()
  // measurement: string

  // @IsString()
  // typeNovelty: 'novelty' | 'retirement' | 'social-security';
}
