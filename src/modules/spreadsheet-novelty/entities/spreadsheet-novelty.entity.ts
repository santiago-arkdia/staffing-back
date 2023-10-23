/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'spreadsheet' })
export class NoveltySpreadsheet {
  @Prop({ type: String, required: true })
  nameOfSpreadsheet: string;

  @Prop({ type: String, required: true })
  description: string;

}

export const NoveltySpreadsheetSchema = SchemaFactory.createForClass(NoveltySpreadsheet);
