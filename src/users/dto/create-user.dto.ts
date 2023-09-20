import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documentType: string;

  @ApiProperty()
  @IsNotEmpty()
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
}

export class UpdateAuthorDto extends PartialType(
  OmitType(CreateUserDto, ['name']),
) {}
