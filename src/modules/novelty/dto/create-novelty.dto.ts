/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsArray, IsDate, IsNumber, IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateNoveltyDto {
  @IsString()
  client: string;

  @IsString()
  collaborator: string;

  @IsString()
  concept: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  contract: string;

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
