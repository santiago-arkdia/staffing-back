/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {CategoriesNovelty} from 'src/modules/categories-novelty/entities/categories-novelties.entity';

@Schema({timestamps: true})
export class Concept {

    @Prop({type: String, required: true})
    code: string;

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: Boolean, required: true})
    benefit: boolean;

    @Prop({type: String, required: true})
    reportType: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'CategoriesNovelty'}]})
    categoryNovelty: CategoriesNovelty;

    @Prop({type: String, required: true})
    registers: string;

    @Prop({type: String, required: true})
    approves: string;

    @Prop({type: Number, default: 1})
    state: number;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
