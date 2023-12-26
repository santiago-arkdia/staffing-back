/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoriesRetirement } from 'src/modules/categories-retirement/entities/categories-retirement.entity';

@Schema({timestamps: true})
export class ConceptsRetirement {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: Number, default: 1})
    state: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CategoriesRetirement'})
    categoriesRetirement: CategoriesRetirement;

}

export const ConceptsRetirementSchema = SchemaFactory.createForClass(ConceptsRetirement);
