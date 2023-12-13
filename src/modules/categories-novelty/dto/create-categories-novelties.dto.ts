/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsString} from 'class-validator';

@Schema()
export class CreateCategoriesNewsDto {
  @IsString()
  type: string;

  @IsString()
  description: string;
}
