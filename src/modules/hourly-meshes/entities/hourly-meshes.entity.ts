/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JobPositions } from 'src/modules/business-configuration/job-positions/entities/job-positions.entity';
import { Schedules } from 'src/modules/schedules/entities/schedules.entity';

@Schema({timestamps: true})
export class HourlyMeshes {

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: mongoose.Schema.Types.Array, ref: 'JobPositions'})
    jobPositions: JobPositions[];

    @Prop({type: mongoose.Schema.Types.Array, ref: 'Schedules'})
    schedules: Schedules[];

    @Prop()
    state: number;

}

export const HourlyMeshesSchema = SchemaFactory.createForClass(HourlyMeshes);
