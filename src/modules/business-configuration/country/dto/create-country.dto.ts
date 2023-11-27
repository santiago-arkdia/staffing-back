/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateCountriesDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    image: string;
}
