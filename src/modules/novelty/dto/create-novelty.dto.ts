/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsArray, IsNumber, IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateNoveltyDto {
  @IsString()
  collaborator: string;

  @IsString()
  categoryNovelty: string;

  @IsString()
  concept: string;

  @IsString()
  contract: string;

  @IsString()
  @IsOptional()
  initialDate: Date;

  @IsString()
  @IsOptional()
  finalDate: Date;

  @IsNumber()
  @IsOptional()
  value: number;

  @IsString()
  @IsOptional()
  typeValue: string;
  
  @IsArray()
  @IsOptional()
  documents: string[];

}
