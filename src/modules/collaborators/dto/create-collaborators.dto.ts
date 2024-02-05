/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsEmail, IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateCollaboratorDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsEmail()
  email: string;

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
  jobPosition: string;
}
