/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsArray, IsDate, IsNumber, IsObject, IsOptional, IsString} from 'class-validator';
import { Contract } from 'src/shared/models/contract';
import { Documents } from 'src/shared/models/documents';

@Schema()
export class CreateNoveltyRetirementDto {
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

  @IsString()
  @IsOptional()
  note: string;

  @IsArray()
  @IsOptional()
  documents: Documents[];
  
  @IsArray()
  @IsOptional()
  contract: Contract[];

  @IsNumber()
  @IsOptional()
  state: number;

  @IsNumber()
  @IsOptional()
  signedByApprover: number;

  @IsNumber()
  @IsOptional()
  signedByCollaborator: number;

  @IsNumber()
  @IsOptional()
  loadedOnPayroll: number;

  @IsArray()
  @IsOptional()
  comments: any[];

}