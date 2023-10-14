import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';


@Schema()
export class AdminClient {
  @Prop({ type: String, required: true})
  name: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Number, required: true })
  phone: number;

  @Prop()
  state: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserEntity;

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'ModuleParameterization' })
  moduleParameterization: ModuleParameterization[];
}

export const AdminClientSchema = SchemaFactory.createForClass(AdminClient);
