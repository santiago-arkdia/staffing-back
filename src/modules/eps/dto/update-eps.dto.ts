/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

@Schema()
export class UpdateEpsDto {
  @IsString()
  name: string;
}
