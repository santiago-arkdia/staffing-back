/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  documentType: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  documentNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cellphone: string;

  // @ApiProperty()
  // @IsString()
  // @IsEmail()
  // createdBy: string;
}

export class UpdateAuthorDto extends PartialType(
  OmitType(CreateUserDto, ['name']),
) {}
