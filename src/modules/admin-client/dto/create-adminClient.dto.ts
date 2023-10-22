import { Schema } from '@nestjs/mongoose';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class CreateClientsDto {
  @IsString()
  name: string;
  
  @IsString()
  lastName: string;

  @IsNumber()
  phone: number;

  @IsString()
  user: string;

  @IsNumber()
  @IsOptional()
  state: number;

  @IsArray()
  moduleParameterization: ModuleParameterization[];
}
