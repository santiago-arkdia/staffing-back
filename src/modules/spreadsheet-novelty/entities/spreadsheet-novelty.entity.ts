/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({collection: 'spreadsheets', timestamps: true})
export class NoveltySpreadsheet {

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: String, required: true})
    documentUrl: string;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const NoveltySpreadsheetSchema =
    SchemaFactory.createForClass(NoveltySpreadsheet);
