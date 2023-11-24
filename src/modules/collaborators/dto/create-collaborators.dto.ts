/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateCollaboratorDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsString()
  documentType: string;

  @IsOptional()
  @IsString()
  utilityCenter: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  centersCosts: string;

  @IsOptional()
  @IsString()
  jobPositions: string;
}
