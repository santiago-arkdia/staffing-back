/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class ServiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nameService?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  enabled?: boolean;
}

export class UpdateUserServiceDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsObject({ each: true })
  @IsNotEmpty()
  services?: ServiceDto[]; 
}