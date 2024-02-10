/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsOptional, IsString} from 'class-validator';

@Schema()
export class UpdateCollaboratorDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  document: string;

  @IsOptional()
  @IsString()
  documentType: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  utilityCenter: string;

  @IsOptional()
  @IsString()
  centersCosts: string;

  @IsOptional()
  @IsString()
  jobPosition: string;

  @IsString()
  user: string;
}
