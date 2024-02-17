/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateCategoriesNoveltiesDto {
  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  state: number;

  @IsString()
  approves: string;

  @IsString()
  typeNovelty: 'novelty' | 'retirement' | 'social-security';
}
