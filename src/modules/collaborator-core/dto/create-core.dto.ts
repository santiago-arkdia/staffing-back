/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateCoreDto {
  @IsString()
  @IsOptional()
  collaborator: string;

  @IsString()
  @IsOptional()
  costCenter: string;

  @IsString()
  @IsOptional()
  utilityCenter: string;

  @IsString()
  @IsOptional()
  novelty: string;
}
