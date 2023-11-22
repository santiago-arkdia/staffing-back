/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({timestamps: true})
export class Diagnosis {
    @Prop({type: String, required: true})
    name: string;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const DiagnosisSchema = SchemaFactory.createForClass(Diagnosis);
