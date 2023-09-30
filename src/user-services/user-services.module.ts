/* eslint-disable prettier/prettier */
// services.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesService } from './services/user-services.service';
import { UserServiceEntity, UserSchema } from './entities/user-service.entity';
import { ServicesController } from './controllers/user-services.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserServiceEntity.name, schema: UserSchema },
    ]),
  ],
  controllers: [ServicesController, ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
