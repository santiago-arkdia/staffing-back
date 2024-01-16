import { Schema } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class CreateClientsDto {
  @IsString()
  name: string;

  @IsString()
  nit: string;

  @IsOptional()
  @IsString()
  user: string;

  @IsOptional()
  @IsNumber()
  state: number;

  @IsOptional()
  @IsNumber()
  cutoffDate: number;

  @IsOptional()
  @IsArray()
  analysts: Admin[];
  
  @IsArray()
  moduleParameterization: ModuleParameterization[];
}