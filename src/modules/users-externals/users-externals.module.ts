/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users-externals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserExternal, UserSchema } from './entities/users-externals.entity';
import { UsersExternalService } from './services/users-externals.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserExternal.name, schema: UserSchema }]), // Registra el modelo
  ],
  controllers: [UsersController],
  providers: [UsersExternalService],
  exports: [UsersExternalService],
})
export class UsersExternalsModule {}
