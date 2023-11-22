/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsJSON, IsString} from 'class-validator';

@Schema()
export class UpdateEpsDto {
    @IsString()
    name: string;

    @IsJSON()
    more: JSON;
}
