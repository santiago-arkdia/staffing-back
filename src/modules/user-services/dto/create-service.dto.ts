/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';

export class CreateServiceDto {
@ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsObject()
  service: {
    [key: string]: boolean;
  };
}
