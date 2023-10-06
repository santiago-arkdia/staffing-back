/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsOptional,
  // IsDate,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class CreateUserClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cellphone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;

  // @ApiProperty()
  // @IsDate()
  // dateClose : Date;

  @ApiProperty()
  @IsString()
  frequencyPay: string;

  // @ApiProperty()
  // @IsDate()
  // payDay: Date;

  @ApiProperty()
  @IsString()
  frequencyPayBonus: string;

  @ApiProperty()
  @IsBoolean()
  projected: boolean;

  @ApiProperty()
  @IsBoolean()
  chat : boolean;
}

export class UpdateAuthorDto extends PartialType(
  OmitType(CreateUserClientDto, ['name']),
) {}
