/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsArray, IsDate, IsNumber, IsObject, IsOptional, IsString} from 'class-validator';
import { Contract } from 'src/shared/models/contract';
import { Documents } from 'src/shared/models/documents';

@Schema()
export class CreateNoveltyDto {
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