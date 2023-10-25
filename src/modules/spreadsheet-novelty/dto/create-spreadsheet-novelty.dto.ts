/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

@Schema()
export class CreateSpreadsheetsDto {
  @IsString()
  nameOfSpreadsheet: string;

  @IsString()
  description: string;

  @IsString()
  documentUrl: string;
}
