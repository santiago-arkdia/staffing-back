/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({collection: 'novelty-states', timestamps: true})
export class NoveltyState {
    @Prop({type: String, required: true})
    name: string;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const NoveltyStateSchema = SchemaFactory.createForClass(NoveltyState);
