/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {Country} from '../../country/entities/country.entity';
import mongoose from 'mongoose';

@Schema({timestamps: true})
export class Region {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop()
    image: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Country'})
    country: Country;

    @Prop()
    state: number;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
