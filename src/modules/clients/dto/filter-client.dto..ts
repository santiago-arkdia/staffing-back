import { Schema } from '@nestjs/mongoose';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Schema()
export class FilterClientsDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  state: number;
}
