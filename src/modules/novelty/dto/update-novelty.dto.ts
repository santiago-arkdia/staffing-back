/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import {Type} from "class-transformer";
class CommentObject {
  @IsString()
  comment: string;

  @IsString()
  user: string;

  @IsDateString()
  date: string;
}
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
  concept: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  contract: string;

  @IsOptional()
  @IsArray()
  documents: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CommentObject)
  comments: CommentObject[];

  @IsOptional()
  @IsNumber()
  state: number;

  @IsNumber()
  @IsOptional()
  value: number;
}
