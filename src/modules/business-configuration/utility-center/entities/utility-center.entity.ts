/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {Region} from '../../regions/entities/region.entity';

@Schema({collection: 'utility-centers', timestamps: true})
export class UtilityCenters {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop()
    code: string;

    @Prop()
    state: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Region'})
    region: Region;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const UtilityCenterSchema = SchemaFactory.createForClass(UtilityCenters);
