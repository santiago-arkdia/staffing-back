/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsEmail, IsNumber, IsString} from 'class-validator';

@Schema()
export class CreateCollaboratorTriDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsEmail()
  email: string;

  @IsString()
  documentType: string;

  @IsNumber()
  idTri: number;

}
