/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';

@Schema()
export class CreatePucDto {
  
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  concept: string;

  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  @IsOptional()
  client: string;

}