/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

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
  initialDate: string;

  @IsString()
  finalDate: string;

  @IsString()
  typeOfAttention: string;

  @IsString()
  extension: string;

  @IsString()
  eps: string;

  @IsString()
  diagnosis: string;

  @IsString()
  Description: string;

  @IsString()
  documentUpload: string;
}
