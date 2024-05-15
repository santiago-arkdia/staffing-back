import { Schema } from '@nestjs/mongoose';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class AdminsDto{
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsNumber()
  @IsOptional()
  documentType: string;

  @IsNumber()
  @IsOptional()
  documentNumber: string;

  @IsString()
  type: string;

  @IsString()
  user: string;

  @IsNumber()
  @IsOptional()
  state: number;
  
  @IsArray()
  moduleParameterization: ModuleParameterization[];
}
