/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsBoolean, IsString } from 'class-validator';

@Schema()
export class CreateNoveltyDto {
  @IsString()
  name: string;

  @IsString()
  performance: string;

  @IsString()
  state: string;

  @IsString()
  type: string;

  @IsString()
  numberInability: string;

  @IsString()
  initialDate: Date;

  @IsString()
  finalDate: Date;

  @IsString()
  typeOfAttention: string;

  @IsBoolean()
  extension: boolean;

  @IsString()
  eps: string;

  @IsString()
  diagnosis: string;

  @IsString()
  Description: string;

  @IsString()
  documentUpload: string;
}
