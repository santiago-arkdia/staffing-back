/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({timestamps: true})
export class Arl {
    @Prop({type: String, required: true})
    name: string;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const ArlSchema = SchemaFactory.createForClass(Arl);
