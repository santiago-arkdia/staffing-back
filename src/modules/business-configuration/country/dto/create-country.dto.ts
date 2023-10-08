import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

@Schema()
export class CreateCountrysDto{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;
}
