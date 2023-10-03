/* eslint-disable prettier/prettier */
// services.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesService } from './services/user-services.service';
import { UserServiceEntity, UserSchema } from './entities/user-service.entity';
import { ServicesController } from './controllers/user-services.controller';
// import { AdminGuard } from 'src/auth/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserServiceEntity.name, schema: UserSchema },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
