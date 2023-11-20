/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsObject
} from 'class-validator';

@Schema()
export class UpdateNoveltyDto {
  @IsOptional()
  @IsString()
  collaborator: string;

  @IsOptional()
  @IsString()
  categoryNovelty: string;

  @IsOptional()
  @IsString()
  numberInability: string;

  @IsOptional()
  @IsString()
  initialDate: Date;

  @IsOptional()
  @IsString()
  finalDate: Date;

  @IsOptional()
  @IsString()
  typeOfAttention: string;

  @IsOptional()
  @IsBoolean()
  extension: boolean;

  @IsOptional()
  @IsString()
  eps: string;

  @IsOptional()
  @IsString()
  diagnosis: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  documents: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @IsObject({ each: true })
  comments: CommentObject[];

  @IsOptional()
  @IsNumber()
  state: number;
}
class CommentObject {
  @IsString()
  comment: string;

  @IsString()
  user: string;

  @IsDateString()
  date: string;
}
