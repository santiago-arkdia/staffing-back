/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsBoolean, IsString} from 'class-validator';

@Schema()
export class CreateCategoriesNewsDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  code: string;

  @IsString()
  approves: string;

  @IsString()
  manages: string;

  @IsString()
  description: string;

  @IsString()
  typeValue: string;

  @IsBoolean()
  applyDate: boolean;
}
