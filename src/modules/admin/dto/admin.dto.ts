import { Schema } from '@nestjs/mongoose';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class AdminsDto{
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsNumber()
  documentType: string;

  @IsNumber()
  documentNumber: string;

  @IsString()
  type: string;

  @IsString()
  user: string;

  @IsNumber()
  state: number;
  
  @IsArray()
  moduleParameterization: ModuleParameterization[];
}
