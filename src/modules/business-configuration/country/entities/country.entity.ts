/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({timestamps: true})
export class Country {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop()
    image: string;

    @Prop()
    state: number;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
