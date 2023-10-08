/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<NovedadEntity>;

@Schema({ collection: 'novedades' }) // Define el nombre de la colección
export class NovedadEntity {
  @Prop({ type: String, required: true })
  titulo: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

// export type NovedadDocument = NovedadEntity & Document;

export const NovedadSchema = SchemaFactory.createForClass(NovedadEntity);
