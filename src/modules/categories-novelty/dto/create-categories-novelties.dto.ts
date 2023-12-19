/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsString} from 'class-validator';

@Schema()
export class CreateCategoriesNoveltiesDto {
  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsString()
  approves: string;
}
