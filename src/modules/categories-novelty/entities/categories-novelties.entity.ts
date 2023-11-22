/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({collection: 'categories-novelties', timestamps: true})
export class CategoriesNovelty {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    type: string;

    @Prop({type: Number, required: true})
    code: number;

    @Prop({type: String, required: true})
    approves: string;

    @Prop({type: String, required: true})
    manages: string;

    @Prop({type: String})
    description: string;

    @Prop({type: Number, default: 1})
    state: number;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const CategoriesNoveltySchema = SchemaFactory.createForClass(CategoriesNovelty);
