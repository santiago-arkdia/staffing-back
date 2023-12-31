/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsNumber, IsOptional, IsString} from 'class-validator';

@Schema()
export class UserDto {

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    documentNumber: string;

    @IsString()
    @IsOptional()
    role: string;

    @IsNumber()
    @IsOptional()
    state: string;

    @IsString()
    @IsOptional()
    createdAt: string;

}
