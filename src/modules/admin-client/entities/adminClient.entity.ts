import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class AdminClient {
  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop({ type: String, required: true})
  name: number;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Number, required: true })
  phone: number;
}

export const ClientSchema = SchemaFactory.createForClass(AdminClient);
