/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({timestamps: true})
export class Collaborator {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: Number, default: 1})
    status: number;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator);
