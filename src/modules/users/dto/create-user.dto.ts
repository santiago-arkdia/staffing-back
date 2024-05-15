/* eslint-disable prettier/prettier */
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    IsOptional
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {

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
    @IsOptional()
    role: string;

    @IsString()
    image: string;

}
