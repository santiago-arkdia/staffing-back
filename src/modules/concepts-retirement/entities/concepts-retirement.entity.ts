/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({timestamps: true})
export class ConceptsRetirement {
    @Prop({type: String, required: true})
    name: string;

}

export const ConceptsRetirementSchema = SchemaFactory.createForClass(ConceptsRetirement);
