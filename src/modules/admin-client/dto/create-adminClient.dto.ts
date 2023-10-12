import { Schema } from '@nestjs/mongoose';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class CreateClientsDto {
  @IsString()
  name: string;

  @IsNumber()
  phone: number;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
