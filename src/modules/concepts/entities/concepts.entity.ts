/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {CategoriesNovelty} from 'src/modules/categories-novelty/entities/categories-novelties.entity';

@Schema({timestamps: true})
export class Concept {

    @Prop({type: String})
    code: string;

    @Prop({type: String, required: true})
    name: string;

    // @Prop({type: Boolean})
    // benefit: boolean;

    // @Prop({type: String})
    // reportType: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CategoriesNovelty'})
    categoryNovelty: CategoriesNovelty;

    @Prop({type: String, required: true})
    manages: string;

    @Prop({type: String, required: true})
    approves: string;

    // @Prop({type: String})
    // measurement: string;

    @Prop({type: Number, default: 1})
    state: number;

    // @Prop({type: Boolean, default: false})
    // applyDate: boolean;

    @Prop({ type: Object })
    more: Record<string, any>;

    @Prop({type: String})
    typeNovelty: string;
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
