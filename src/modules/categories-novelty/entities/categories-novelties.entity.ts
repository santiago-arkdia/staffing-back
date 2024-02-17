/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({collection: 'categories-novelties', timestamps: true})
export class CategoriesNovelty {

    @Prop({type: String, required: true})
    type: string;

    @Prop({type: String})
    description: string;

    @Prop({type: Number, default: 1})
    state: number;

    @Prop({type: String})
    approves: string;

    @Prop({ type: Object })
    more: Record<string, any>;

    @Prop({type: String})
    typeNovelty: string;
}

export const CategoriesNoveltySchema = SchemaFactory.createForClass(CategoriesNovelty);
