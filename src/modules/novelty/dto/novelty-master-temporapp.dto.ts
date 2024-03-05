/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {IsOptional, IsString, ValidateNested} from 'class-validator';

export class OperationDataDto {
  @IsString()
  @IsOptional()
  canal: string;

  @IsString()
  @IsOptional()
  diagnostico: string;

  @IsString()
  @IsOptional()
  obcervacion: string;

  @IsString()
  @IsOptional()
  nitCliente: string;

  @IsString()
  @IsOptional()
  idCliente: string;

  @IsString()
  @IsOptional()
  documento: string;

  @IsString()
  @IsOptional()
  dimension: string;

  @IsString()
  @IsOptional()
  concepto: string;

  @IsString()
  @IsOptional()
  proporcional: string;

  @IsString()
  @IsOptional()
  cantidad: string;

  @IsString()
  @IsOptional()
  fechaInicial: string;

  @IsString()
  @IsOptional()
  cuotas: string;

  @IsString()
  @IsOptional()
  fechaAusentismo: string;

  @IsString()
  @IsOptional()
  diasEnDinero: string;

  @IsString()
  @IsOptional()
  dia31: string;

  @IsString()
  @IsOptional()
  numIncapacidad: string;

  @IsString()
  @IsOptional()
  prorroga: string;

  @IsString()
  @IsOptional()
  numeroProrroga: string;

  @IsString()
  @IsOptional()
  observacion: string;

  @IsString()
  @IsOptional()
  tipoAtencion: string;

  @IsString()
  @IsOptional()
  valor2: string;

  @IsString()
  @IsOptional()
  fechaSuceso: string;
}

@Schema()
export class NoveltyMasterTemporappDto {
  // @IsString()
  // tipoOperacion: string;

  // @IsString()
  // instancia: string;

  // @IsString()
  // usuarioExterno: string;

  // @ValidateNested()
  // @Type(() => OperationDataDto)
  // datos: OperationDataDto;
  

  @IsString()
  payroll: string;
}