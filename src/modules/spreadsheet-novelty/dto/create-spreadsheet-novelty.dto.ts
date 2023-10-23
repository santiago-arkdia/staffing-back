/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';

@Schema()
export class CreateSpreadsheetsDto {
  @IsString()
  nameOfSpreadsheet: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  documentUrl?: string;
}
