import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Schema()
export class Payroll {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop()
  documentType: string;

  @Prop()
  documentNumber: number

  @Prop()
  state: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserEntity;
}

export const PayrollSchema = SchemaFactory.createForClass(Payroll);
