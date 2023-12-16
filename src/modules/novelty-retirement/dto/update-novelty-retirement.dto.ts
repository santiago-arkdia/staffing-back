/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Documents } from 'src/shared/models/documents';
import { Contract } from 'src/shared/models/contract';

@Schema()
export class UpdateNoveltyDto {
  @IsString()
  collaborator: string;

  @IsString()
  conceptsRetirement: string;

  @IsString()
  @IsOptional()
  finishDate: string;

  @IsString()
  @IsOptional()
  endDate: string;

  @IsNumber()
  @IsOptional()
  note: string;

  @IsArray()
  @IsOptional()
  documents: Documents[];
  
  @IsArray()
  @IsOptional()
  contract: Contract[];
}
