/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateCoreDto {
  @IsString()
  collaborator: string;

  @IsString()
  costCenter: string;

  @IsString()
  @IsOptional()
  utilityCenter: string;
}
