/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class NovedadDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;
}
