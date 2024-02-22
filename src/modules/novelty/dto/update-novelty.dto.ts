/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import { PartialType } from '@nestjs/swagger';
import { CreateNoveltyDto } from './create-novelty.dto';

@Schema()
export class UpdateNoveltyDto extends PartialType(CreateNoveltyDto) {

}

