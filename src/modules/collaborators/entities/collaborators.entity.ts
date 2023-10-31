/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'collaborator' })
export class Collaborator {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, default: 1 })
  status: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator);
