/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';

@Schema()
export class CreateConceptsRetirementDto {
  @IsString()
  name: string;

  @IsString()
  manages: string;

  @IsString()
  @IsOptional()
  approves: string;

  @IsString()
  categoriesRetirement: string;
}