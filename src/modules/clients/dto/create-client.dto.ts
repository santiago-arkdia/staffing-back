import { Schema } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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

  @IsArray()
  moduleParameterization: ModuleParameterization[];
}
