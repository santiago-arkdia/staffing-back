/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'spreadsheet' })
export class NoveltySpreadsheet {

  @Prop({ type: String, required: true })
  nameOfSpreadsheet: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  documentUrl: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const NoveltySpreadsheetSchema =
  SchemaFactory.createForClass(NoveltySpreadsheet);
