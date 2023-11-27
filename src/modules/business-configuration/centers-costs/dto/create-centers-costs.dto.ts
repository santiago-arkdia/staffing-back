/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateCentersCostsDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    code: string;

    @IsString()
    @IsOptional()
    region: string;
}
