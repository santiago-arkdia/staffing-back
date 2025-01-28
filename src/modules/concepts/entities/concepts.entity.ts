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

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CategoriesNovelty'})
    categoryNovelty: CategoriesNovelty;

    @Prop({type: Number, default: 1})
    state: number;

    @Prop({type: Array, required: true})
    approves: any[];

    @Prop({ type: Array })
    formObject: any[];

    @Prop({type: Boolean})
    sendInfoTri: boolean;

    @Prop({type: String})
    moduleApprovedTri: string;

    // @Prop({type: String})
    // typeNovelty: string;
    /*
    * state = 0 => No aprobado 
    * state = 1 => Aprobado
    * state = 2 => Por aprobar de analista
    * state = 3 => Por corregir
    * state = 4 => Pre aprobados
    * state = 5 => Por aprobar juridico
    */

    // @Prop({type: Boolean})
    // benefit: boolean;

    // @Prop({type: String})
    // reportType: string;


    // @Prop({type: String, required: true})
    // manages: string;

    // @Prop({type: String})
    // measurement: string;

    // @Prop({type: Boolean, default: false})
    // applyDate: boolean;

    // @Prop({ type: Object })
    // more: Record<string, any>;

    
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
