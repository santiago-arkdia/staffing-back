/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsEmail, IsNumber, IsString} from 'class-validator';

@Schema()
export class CreateClientTriDto {

  @IsString()
  name: string;

  @IsString()
  nit: string;

  @IsNumber()
  idTri: number;

}
