/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({collection: 'categories-novelties', timestamps: true})
export class CategoriesNovelty {

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String})
    typeNovelty: string;

    @Prop({type: Number, default: 1})
    state: number;

}

export const CategoriesNoveltySchema = SchemaFactory.createForClass(CategoriesNovelty);
