/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';

import {IsArray,  IsNumber, IsOptional, IsString ,  IsObject, IsBoolean} from 'class-validator';


@Schema()
export class CreateNoveltyDto {
  
  @IsString()
  typeNovelty: string;

  @IsString()
  client: string;

  @IsString()
  collaborator: string;

  // Campos comunes a Novelty y Retirement
  @IsString()
  //@IsOptional()  cambio 
  concept?: string;

  @IsNumber()
  @IsOptional()
  state?: number;

  @IsObject()
  @IsOptional()
  reportingObject: Record<string, any>;

  @IsArray()
  @IsOptional()
  documents?: any[];

  @IsArray()
  @IsOptional()
  comments?: any[]; 

  @IsString()
  contract: string;

  @IsArray()
  @IsOptional()
  approves: any[];

  @IsString()
  @IsOptional()
  moduleApprove: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  stateRole: string;

  @IsBoolean()
  @IsOptional()
  statusTemporApp: boolean;

  @IsBoolean()
  @IsOptional()
  tri: boolean;

  @IsBoolean()
  @IsOptional()
  sendInfoTri: boolean;

  @IsString()
  @IsOptional()
  moduleApprovedTri: string;

  @IsString()
  @IsOptional()
  documentIdTri: string;
}

