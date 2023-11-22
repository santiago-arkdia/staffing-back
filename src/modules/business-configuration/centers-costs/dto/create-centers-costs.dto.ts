/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsString} from 'class-validator';

@Schema()
export class CreateCentersCostsDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    code: string;

    @IsString()
    region: string;
}
