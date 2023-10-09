/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

@Schema()
export class CreateConceptsDto {
  @IsString()
  name: string;

  @IsString()
  performance: string;

  @IsString()
  reportForm: string;

  @IsString()
  additionalText: string
}
