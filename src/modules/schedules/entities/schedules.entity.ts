/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JobPositions } from 'src/modules/business-configuration/job-positions/entities/job-positions.entity';

@Schema({timestamps: true})
export class Schedules {

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    startTime: string;

    @Prop({type: String, required: true})
    endTime: string;

    @Prop({type: String, required: true})
    weekDay: string;

    @Prop({type: String, default: 1})
    state: number;

}

export const SchedulesSchema = SchemaFactory.createForClass(Schedules);
