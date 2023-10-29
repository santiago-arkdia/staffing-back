/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserStateDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNumber()
  state: number;
}
