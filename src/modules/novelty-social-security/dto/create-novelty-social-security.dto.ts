/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsArray, IsDate, IsNumber, IsObject, IsOptional, IsString} from 'class-validator';
import { Contract } from 'src/shared/models/contract';
import { Documents } from 'src/shared/models/documents';

@Schema()
export class CreateNoveltySocialSecurityDto {

  @IsString()
  collaborator: string;

  @IsOptional()
  @IsString()
  utilityCenter: string;

  @IsOptional()
  @IsString()
  centersCosts: string;

  @IsOptional()
  @IsString()
  conceptSocialSecurity: string;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate: string;

  @IsString()
  @IsOptional()
  previousPeriod: string;
  
  @IsString()
  @IsOptional()
  hours: string;

  @IsString()
  @IsOptional()
  units: string;

  @IsString()
  @IsOptional()
  minutes: string;

  @IsString()
  @IsOptional()
  observations: string;

  @IsString()
  @IsOptional()
  file: string;

}