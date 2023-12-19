import { Schema } from '@nestjs/mongoose';
import { PartialType } from "@nestjs/swagger";
import { CreateClientsDto } from './create-client.dto';

export class UpdateClientsDto extends PartialType(CreateClientsDto) {}
