import { Schema } from '@nestjs/mongoose';
import { PartialType } from "@nestjs/swagger";
import { CreateClientsDto } from './create-client.dto';
import { IsArray } from 'class-validator';

export class UpdateClientsDto extends PartialType(CreateClientsDto) {

    @IsArray()
    conceptsPuc: any;
    
}
