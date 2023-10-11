/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

@Schema()
export class UpdateNoveltyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  performance?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  numberInability?: string;

  @IsOptional()
  @IsDate()
  initialDate?: Date;

  @IsOptional()
  @IsDate()
  finalDate?: Date;

  @IsOptional()
  @IsString()
  typeOfAttention?: string;

  @IsOptional()
  @IsBoolean()
  extension?: boolean;

  @IsOptional()
  @IsString()
  eps?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  Description?: string;

  @IsOptional()
  @IsString()
  documentUpload?: string;
}
