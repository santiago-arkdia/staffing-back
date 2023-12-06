/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsArray, IsDate, IsNumber, IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateNoveltyDto {
  @IsString()
  collaborator: string;

  @IsString()
  categoryNovelty: string;

  @IsString()
  concept: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  value: number;

  @IsDate()
  @IsOptional()
  date: Date;
  
  @IsArray()
  @IsOptional()
  documents: string[];

}
