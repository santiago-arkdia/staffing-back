/* eslint-disable prettier/prettier */
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    user: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

}
