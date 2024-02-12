/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsArray, IsDate, IsNumber, IsObject, IsOptional, IsString} from 'class-validator';
// class ContractDto {
//   @IsOptional()
//   @IsString()
//   id: string;

//   @IsOptional()
//   @IsString()
//   observation: string;

//   @IsOptional()
//   @IsString()
//   file: string;
// }
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

  @IsNumber()
  @IsOptional()
  value: number;

  @IsString()
  @IsOptional()
  observations: string;

  @IsArray()
  @IsOptional()
  documents: string[];

  @IsNumber()
  @IsOptional()
  contract: number;

}